import { NextResponse } from 'next/server';

export async function GET() {
	const AWESOMEAPI = process.env.AWESOMEAPI_URL;

	const res = await fetch(`${AWESOMEAPI}/json/all`, {
		next: { revalidate: 900 },
	});

	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Falha ao buscar cotações' },
			{ status: res.status },
		);
	}

	const raw: Record<string, Record<string, string>> = await res.json();

	const data = Object.values(raw).map((r) => ({
		symbol: `${r.code}${r.codein}`,
		currencyCode: r.code,
		currencyName: r.name,
		bid: r.bid,
		ask: r.ask,
		high: r.high,
		low: r.low,
		varBid: r.varBid,
		pctChange: r.pctChange,
		timestamp: Number(r.timestamp),
		datetime: r.create_date,
	}));

	return NextResponse.json(data);
}
