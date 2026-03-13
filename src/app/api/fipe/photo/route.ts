import { type NextRequest, NextResponse } from 'next/server';

const AUTO_DEV_BASE = 'https://api.auto.dev';
const UNSPLASH_BASE = 'https://api.unsplash.com';

function extractBaseModel(modelo: string): string {
	return modelo.trim().split(/\s+/)[0] ?? modelo;
}

async function fetchAutoDevPhoto(
	make: string,
	model: string,
	year: string | null,
): Promise<string | null> {
	const url = new URL(`${AUTO_DEV_BASE}/vehicles`);
	url.searchParams.set('make', make);
	url.searchParams.set('model', model);
	if (year) url.searchParams.set('year', year);
	url.searchParams.set('limit', '1');

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${process.env.AUTO_DEV_API_KEY}`,
			'Content-Type': 'application/json',
		},
		next: { revalidate: 86400 },
	});

	if (!res.ok) return null;

	const data = await res.json();
	const records: unknown[] = Array.isArray(data)
		? data
		: (data?.records ?? data?.vehicles ?? []);

	const first = records[0] as Record<string, unknown> | null | undefined;
	const images = (first?.images ?? first?.imageUrl ?? []) as
		| string[]
		| Array<{ url: string }>
		| string;

	if (typeof images === 'string') return images;
	if (Array.isArray(images) && images.length > 0) {
		const img = images[0];
		return typeof img === 'string' ? img : (img?.url ?? null);
	}
	return null;
}

async function fetchUnsplashPhoto(
	make: string,
	model: string,
): Promise<string | null> {
	const query = `${make} ${model} car`;
	const url = new URL(`${UNSPLASH_BASE}/search/photos`);
	url.searchParams.set('query', query);
	url.searchParams.set('per_page', '1');
	url.searchParams.set('orientation', 'landscape');

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
		},
		next: { revalidate: 86400 },
	});

	if (!res.ok) return null;

	const data = await res.json();
	return (data?.results?.[0]?.urls?.regular as string) ?? null;
}

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const make = searchParams.get('make');
	const modelo = searchParams.get('model');
	const year = searchParams.get('year');

	if (!make || !modelo) {
		return NextResponse.json({ imageUrl: null });
	}

	const model = extractBaseModel(modelo);

	try {
		const imageUrl =
			(await fetchAutoDevPhoto(make, model, year)) ??
			(await fetchUnsplashPhoto(make, model));

		return NextResponse.json({ imageUrl });
	} catch {
		return NextResponse.json({ imageUrl: null });
	}
}
