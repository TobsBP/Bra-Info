import { format, isBefore, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
	Building2,
	CalendarDays,
	MapPin,
	Percent,
	QrCode,
	TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BASE = process.env.BRASILAPI_URL;

async function fetchData<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url, { next: { revalidate: 3600 } });
		if (!res.ok) return null;
		return res.json();
	} catch {
		return null;
	}
}

export default async function HomePage() {
	const year = new Date().getFullYear();

	const [banks, taxas, feriados, pix] = await Promise.all([
		fetchData<unknown[]>(`${BASE}/banks/v1`),
		fetchData<{ nome: string; valor: number }[]>(`${BASE}/taxas/v1`),
		fetchData<{ date: string; name: string; type: string }[]>(
			`${BASE}/feriados/v1/${year}`,
		),
		fetchData<unknown[]>(`${BASE}/pix/v1/participants`),
	]);

	const today = startOfDay(new Date());
	const upcomingFeriados =
		feriados?.filter((f) => !isBefore(parseISO(f.date), today)).slice(0, 5) ??
		[];

	const selic = taxas?.find((t) => t.nome.toLowerCase().includes('selic'));
	const cdi = taxas?.find((t) => t.nome.toLowerCase().includes('cdi'));

	const descriptions: Record<string, string> = {
		SELIC: 'Taxa básica de juros da economia brasileira.',
		CDI: 'Taxa de empréstimos entre bancos, reflete a liquidez.',
		IPCA: 'Índice oficial de inflação do Brasil.',
		IGPM: 'Índice Geral de Preços do Mercado.',
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">
					Bra-Info Dashboard
				</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1 text-sm">
					Dados públicos do Brasil em tempo real
				</p>
			</div>

			{/* KPI cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title="Bancos cadastrados"
					value={banks?.length ?? '—'}
					description="Total de IFs no Brasil"
					icon={Building2}
				/>
				<StatCard
					title="SELIC"
					value={selic ? `${selic.valor.toFixed(2)}% a.a.` : '—'}
					description="Taxa básica de juros"
					icon={Percent}
				/>
				<StatCard
					title="CDI"
					value={cdi ? `${cdi.valor.toFixed(2)}% a.a.` : '—'}
					description="Certificado de Depósito Interbancário"
					icon={TrendingUp}
				/>
				<StatCard
					title="Participantes PIX"
					value={pix?.length ?? '—'}
					description="Instituições habilitadas"
					icon={QrCode}
				/>
			</div>

			{/* Grid: taxas + feriados */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Taxas */}
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<Percent className="w-4 h-4 text-[hsl(var(--primary))]" />
							Taxas de juros
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						{taxas?.map((t) => (
							<div
								key={t.nome}
								className="flex items-center justify-between py-2 border-b last:border-0"
							>
								<div className="flex flex-col gap-0.5 min-w-0">
									<span className="text-sm font-medium">
										{t.nome}
									</span>
									<span className="text-xs text-[hsl(var(--muted-foreground))] truncate">
										{descriptions[t.nome.toUpperCase()] || 'Taxa de referência.'}
									</span>
								</div>
								<span className="font-mono font-semibold text-sm tabular-nums">
									{t.valor.toFixed(2)}%
								</span>
							</div>
						)) ?? (
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								Indisponível
							</p>
						)}
					</CardContent>
				</Card>

				{/* Próximos feriados */}
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<CalendarDays className="w-4 h-4 text-[hsl(var(--primary))]" />
							Próximos feriados {year}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						{upcomingFeriados.length === 0 && (
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								Nenhum feriado futuro neste ano.
							</p>
						)}
						{upcomingFeriados.map((f) => (
							<div
								key={f.date}
								className="flex items-center gap-3 py-2 border-b last:border-0"
							>
								<div className="min-w-10 text-center bg-[hsl(var(--primary))]/8 rounded-lg p-1.5">
									<p className="text-[10px] text-[hsl(var(--primary))] uppercase font-medium">
										{format(parseISO(f.date), 'MMM', { locale: ptBR })}
									</p>
									<p className="font-bold text-sm leading-none mt-0.5">
										{format(parseISO(f.date), 'dd')}
									</p>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{f.name}</p>
									<p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">
										{format(parseISO(f.date), 'EEEE', { locale: ptBR })}
									</p>
								</div>
								<Badge
									variant={f.type === 'national' ? 'default' : 'secondary'}
									className="text-xs shrink-0"
								>
									{f.type === 'national' ? 'Nacional' : f.type}
								</Badge>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Quick links */}
			<div>
				<h2 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3">
					Explorar módulos
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{[
						{ href: '/banks', icon: Building2, label: 'Bancos' },
						{ href: '/cep', icon: MapPin, label: 'CEP' },
						{ href: '/cambio', icon: TrendingUp, label: 'Câmbio' },
						{ href: '/pix', icon: QrCode, label: 'PIX' },
					].map(({ href, icon: Icon, label }) => (
						<a
							key={href}
							href={href}
							className="group flex flex-col items-center gap-2.5 p-5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary))]/40 hover:bg-[hsl(var(--primary))]/5 transition-all duration-150 shadow-sm"
						>
							<div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))]/15 transition-colors">
								<Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
							</div>
							<span className="text-sm font-medium">{label}</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
