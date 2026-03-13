'use client';

import { Percent } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useTaxas } from '@/lib/hooks/useTaxas';

const COLORS = [
	'hsl(221, 83%, 53%)',
	'hsl(142, 71%, 45%)',
	'hsl(38, 92%, 50%)',
	'hsl(0, 84%, 60%)',
];

const DESCRIPTIONS: Record<string, string> = {
	SELIC: 'Taxa básica de juros da economia brasileira, definida pelo COPOM.',
	CDI: 'Certificado de Depósito Interbancário, taxa para empréstimos entre bancos.',
	IPCA: 'Índice de Preços ao Consumidor Amplo, o medidor oficial da inflação.',
	IGPM: 'Índice Geral de Preços do Mercado, usado frequentemente no reajuste de aluguéis.',
};

export function TaxasView() {
	const { data, isLoading, error } = useTaxas();

	if (isLoading) return <LoadingSkeleton rows={6} />;
	if (error) return <ErrorAlert message={error.message} />;
	if (!data) return null;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Percent className="w-5 h-5" />
						Taxas de Juros (% a.a.)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							data={data}
							layout="vertical"
							margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(var(--border))"
								horizontal={false}
							/>
							<XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
							<YAxis
								dataKey="nome"
								type="category"
								tick={{ fontSize: 11 }}
								width={120}
							/>
							<Tooltip
								formatter={(v: number) => [`${v.toFixed(2)}%`, 'Taxa']}
								contentStyle={{
									background: 'hsl(var(--popover))',
									border: '1px solid hsl(var(--border))',
									borderRadius: 'var(--radius)',
									fontSize: 12,
								}}
							/>
							<Bar dataKey="valor" radius={[0, 4, 4, 0]}>
								{data.map((entry, i) => (
									<Cell key={entry.nome} fill={COLORS[i % COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="pt-6">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Taxa</TableHead>
								<TableHead className="hidden md:table-cell">
									Descrição
								</TableHead>
								<TableHead className="text-right">Valor (% a.a.)</TableHead>
								<TableHead className="text-right hidden sm:table-cell">
									Classificação
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((taxa) => (
								<TableRow key={taxa.nome}>
									<TableCell className="font-medium">{taxa.nome}</TableCell>
									<TableCell className="text-xs text-[hsl(var(--muted-foreground))] hidden md:table-cell">
										{DESCRIPTIONS[taxa.nome.toUpperCase()] ||
											'Taxa oficial de referência.'}
									</TableCell>
									<TableCell className="text-right font-mono font-semibold">
										{taxa.valor.toFixed(2)}%
									</TableCell>
									<TableCell className="text-right hidden sm:table-cell">
										<Badge
											variant={
												taxa.valor < 5
													? 'secondary'
													: taxa.valor < 10
														? 'default'
														: 'destructive'
											}
										>
											{taxa.valor < 5
												? 'Baixa'
												: taxa.valor < 10
													? 'Moderada'
													: 'Alta'}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
