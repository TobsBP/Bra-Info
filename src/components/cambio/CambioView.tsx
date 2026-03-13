'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCambio } from '@/lib/hooks/useCambio';

export function CambioView() {
	const { data, isLoading, error } = useCambio();

	if (isLoading) return <LoadingSkeleton rows={6} />;
	if (error) return <ErrorAlert message={error.message} />;
	if (!data) return null;

	const validRates = data.filter((r) => {
		const bid = parseFloat(r.bid);
		return !Number.isNaN(bid) && bid > 0 && r.currencyCode.length <= 4;
	});

	// Exclude outliers (crypto, etc.) from chart — keep only currencies within
	// 50x the median bid so BTC/ETH don't collapse the Y-axis scale
	const bids = validRates.map((r) => parseFloat(r.bid)).sort((a, b) => a - b);
	const median = bids[Math.floor(bids.length / 2)] ?? 1;
	const chartRates = validRates.filter((r) => parseFloat(r.bid) <= median * 50);

	const chartData = chartRates
		.slice(0, 12)
		.map((r) => ({ name: r.currencyCode, bid: parseFloat(r.bid) }));

	return (
		<div className="space-y-6">
			{/* Chart */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-baseline gap-2">
						Taxa de Compra (BRL)
						<span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">
							moedas fiduciárias
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							data={chartData}
							margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(var(--border))"
							/>
							<XAxis dataKey="name" tick={{ fontSize: 11 }} />
							<YAxis tick={{ fontSize: 11 }} />
							<Tooltip
								formatter={(v: number) => [v.toFixed(4), 'Bid']}
								contentStyle={{
									background: 'hsl(var(--popover))',
									border: '1px solid hsl(var(--border))',
									borderRadius: 'var(--radius)',
									fontSize: 12,
								}}
							/>
							<Bar
								dataKey="bid"
								fill="hsl(var(--sidebar-primary))"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			{/* Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{validRates.map((rate) => {
					const pct = parseFloat(rate.pctChange ?? '0');
					const positive = pct >= 0;
					return (
						<Card
							key={rate.symbol}
							className="hover:shadow-md transition-shadow"
						>
							<CardContent className="p-4">
								<div className="flex items-start justify-between">
									<div>
										<p className="font-bold text-lg">{rate.currencyCode}</p>
										<p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-1">
											{rate.currencyName}
										</p>
									</div>
									<Badge
										variant={positive ? 'default' : 'destructive'}
										className="text-xs gap-1"
									>
										{positive ? (
											<TrendingUp className="w-3 h-3" />
										) : (
											<TrendingDown className="w-3 h-3" />
										)}
										{pct.toFixed(2)}%
									</Badge>
								</div>
								<div className="mt-3 grid grid-cols-2 gap-2 text-sm">
									<div>
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											Compra
										</p>
										<p className="font-semibold">
											{parseFloat(rate.bid).toFixed(4)}
										</p>
									</div>
									<div>
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											Venda
										</p>
										<p className="font-semibold">
											{parseFloat(rate.ask).toFixed(4)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
