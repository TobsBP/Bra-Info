import { type NextRequest, NextResponse } from 'next/server';

const BASE = process.env.BRASILAPI_URL ?? 'https://brasilapi.com.br/api';

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ cnpj: string }> },
) {
	const { cnpj } = await params;
	const res = await fetch(`${BASE}/cnpj/v1/${cnpj}`, {
		next: { revalidate: 3600 },
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
