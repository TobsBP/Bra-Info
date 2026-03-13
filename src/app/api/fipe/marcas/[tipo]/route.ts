import { type NextRequest, NextResponse } from 'next/server';

const BASE =
	process.env.PARALLELUM_URL ?? 'https://parallelum.com.br/fipe/api/v1';

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ tipo: string }> },
) {
	const { tipo } = await params;
	const res = await fetch(`${BASE}/${tipo}/marcas`, {
		next: { revalidate: 86400 },
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
