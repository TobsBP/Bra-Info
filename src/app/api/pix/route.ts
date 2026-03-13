import { NextResponse } from 'next/server';

const BASE = process.env.BRASILAPI_URL ?? 'https://brasilapi.com.br/api';

export async function GET() {
	const res = await fetch(`${BASE}/pix/v1/participants`, {
		next: { revalidate: 86400 },
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
