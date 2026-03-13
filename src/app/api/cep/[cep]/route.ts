import { type NextRequest, NextResponse } from 'next/server';

const BASE = process.env.BRASILAPI_URL ?? 'https://brasilapi.com.br/api';

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ cep: string }> },
) {
	const { cep } = await params;
	const res = await fetch(`${BASE}/cep/v2/${cep}`, {
		next: { revalidate: 3600 },
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
