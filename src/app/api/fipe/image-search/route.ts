import { type NextRequest, NextResponse } from 'next/server';

const UNSPLASH_BASE = 'https://api.unsplash.com';

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('q');
	if (!query) return NextResponse.json({ images: [] });

	const url = new URL(`${UNSPLASH_BASE}/search/photos`);
	url.searchParams.set('query', `${query} car`);
	url.searchParams.set('per_page', '6');
	url.searchParams.set('orientation', 'landscape');

	try {
		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
			next: { revalidate: 3600 },
		});

		if (!res.ok) return NextResponse.json({ images: [] });

		const data = await res.json();
		const images: string[] = (data?.results ?? []).map(
			(r: { urls: { regular: string } }) => r.urls.regular,
		);

		return NextResponse.json({ images });
	} catch {
		return NextResponse.json({ images: [] });
	}
}
