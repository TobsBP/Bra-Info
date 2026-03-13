'use client';

import {
	Building2,
	ChevronLeft,
	ChevronRight,
	QrCode,
	Shield,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { SearchInput } from '@/components/shared/SearchInput';
import { StatCard } from '@/components/shared/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { usePixParticipants } from '@/lib/hooks/usePix';

const PAGE_SIZE = 15;

export function PixView() {
	const { data, isLoading, error } = usePixParticipants();
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);

	const handleSearch = useCallback((v: string) => {
		setSearch(v);
		setPage(1);
	}, []);

	const filtered = useMemo(() => {
		if (!data) return [];
		const q = search.toLowerCase();
		return data.filter(
			(p) =>
				p.nome.toLowerCase().includes(q) ||
				(p.nome_reduzido ?? '').toLowerCase().includes(q) ||
				p.ispb.includes(q),
		);
	}, [data, search]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const stats = useMemo(() => {
		if (!data) return { total: 0, direto: 0, indireto: 0 };
		return {
			total: data.length,
			direto: data.filter((p) => p.tipo_participacao === 'DRCT').length,
			indireto: data.filter((p) => p.tipo_participacao === 'INDT').length,
		};
	}, [data]);

	if (isLoading) return <LoadingSkeleton rows={8} />;
	if (error) return <ErrorAlert message={error.message} />;

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<StatCard
					title="Total de participantes"
					value={stats.total}
					icon={QrCode}
				/>
				<StatCard
					title="Participação direta"
					value={stats.direto}
					icon={Building2}
				/>
				<StatCard
					title="Participação indireta"
					value={stats.indireto}
					icon={Shield}
				/>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<CardTitle className="flex items-center gap-2">
							<QrCode className="w-5 h-5" />
							Participantes ({filtered.length})
						</CardTitle>
						<SearchInput
							placeholder="Buscar participante…"
							onSearch={handleSearch}
							className="sm:w-72"
						/>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nome</TableHead>
								<TableHead className="hidden sm:table-cell">ISPB</TableHead>
								<TableHead>Modalidade</TableHead>
								<TableHead className="hidden md:table-cell">Tipo PSP</TableHead>
								<TableHead className="hidden lg:table-cell">Início</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginated.map((p) => (
								<TableRow key={p.ispb}>
									<TableCell>
										<p className="font-medium text-sm">
											{p.nome_reduzido ?? p.nome}
										</p>
										<p className="text-xs text-[hsl(var(--muted-foreground))] hidden sm:block">
											{p.nome}
										</p>
									</TableCell>
									<TableCell className="hidden sm:table-cell font-mono text-xs">
										{p.ispb}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												p.tipo_participacao === 'DRCT' ? 'default' : 'secondary'
											}
										>
											{p.modalidade_participacao ?? p.tipo_participacao}
										</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell text-sm">
										{p.tipo_participacao}
									</TableCell>
									<TableCell className="hidden lg:table-cell text-sm text-[hsl(var(--muted-foreground))]">
										{p.inicio_operacao
											? new Date(p.inicio_operacao).toLocaleDateString('pt-BR')
											: '—'}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-4 pt-4 border-t">
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								Página {page} de {totalPages}
							</p>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="icon"
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
								>
									<ChevronLeft className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									disabled={page === totalPages}
								>
									<ChevronRight className="w-4 h-4" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
