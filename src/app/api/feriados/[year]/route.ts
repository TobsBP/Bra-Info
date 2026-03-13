import { type NextRequest, NextResponse } from 'next/server';

const BASE = process.env.BRASILAPI_URL ?? 'https://brasilapi.com.br/api';

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ year: string }> },
) {
	const { year } = await params;
	const res = await fetch(`${BASE}/feriados/v1/${year}`, {
		next: { revalidate: 86400 },
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
