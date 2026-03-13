'use client';

import { format, isBefore, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFeriados } from '@/lib/hooks/useFeriados';

export function FeriadosView() {
	const currentYear = new Date().getFullYear();
	const [year, setYear] = useState(currentYear);
	const { data, isLoading, error } = useFeriados(year);

	const today = startOfDay(new Date());
	const upcoming =
		data?.filter((f) => !isBefore(parseISO(f.date), today)) ?? [];

	const typeColor: Record<
		string,
		'default' | 'secondary' | 'destructive' | 'outline'
	> = {
		national: 'default',
		optional: 'secondary',
		bancario: 'outline',
	};

	const typeLabel: Record<string, string> = {
		national: 'Nacional',
		optional: 'Facultativo',
		bancario: 'Bancário',
	};

	return (
		<div className="space-y-6">
			{/* Year selector */}
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setYear((y) => y - 1)}
				>
					<ChevronLeft className="w-4 h-4" />
				</Button>
				<span className="font-semibold text-lg w-16 text-center">{year}</span>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setYear((y) => y + 1)}
				>
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			{isLoading && <LoadingSkeleton rows={6} />}
			{error && <ErrorAlert message={error.message} />}

			{data && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Próximos */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CalendarDays className="w-5 h-5" />
								Próximos feriados
								<Badge variant="secondary">{upcoming.length}</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{upcoming.length === 0 && (
								<p className="text-sm text-[hsl(var(--muted-foreground))]">
									Nenhum feriado futuro neste ano.
								</p>
							)}
							{upcoming.slice(0, 8).map((f) => (
								<div key={f.date} className="flex items-center gap-3">
									<div className="text-center min-w-[48px] bg-[hsl(var(--muted))] rounded-lg py-1 px-2">
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											{format(parseISO(f.date), 'MMM', {
												locale: ptBR,
											}).toUpperCase()}
										</p>
										<p className="font-bold text-lg leading-none">
											{format(parseISO(f.date), 'dd')}
										</p>
									</div>
									<div className="flex-1">
										<p className="font-medium text-sm">{f.name}</p>
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											{format(parseISO(f.date), 'EEEE', { locale: ptBR })}
										</p>
									</div>
									<Badge variant={typeColor[f.type] ?? 'outline'}>
										{typeLabel[f.type] ?? f.type}
									</Badge>
								</div>
							))}
						</CardContent>
					</Card>

					{/* All */}
					<Card>
						<CardHeader>
							<CardTitle>Todos os feriados de {year}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
								{data.map((f) => {
									const isPast = isBefore(parseISO(f.date), today);
									return (
										<div
											key={f.date}
											className={`flex items-center justify-between py-2 border-b last:border-0 ${isPast ? 'opacity-50' : ''}`}
										>
											<div>
												<p className="text-sm font-medium">{f.name}</p>
												<p className="text-xs text-[hsl(var(--muted-foreground))]">
													{format(parseISO(f.date), "dd 'de' MMMM", {
														locale: ptBR,
													})}
												</p>
											</div>
											<Badge
												variant={typeColor[f.type] ?? 'outline'}
												className="text-xs"
											>
												{typeLabel[f.type] ?? f.type}
											</Badge>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
