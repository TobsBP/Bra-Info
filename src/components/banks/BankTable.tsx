'use client';

import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { SearchInput } from '@/components/shared/SearchInput';
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
import { useBanks } from '@/lib/hooks/useBanks';

const PAGE_SIZE = 20;

export function BankTable() {
	const { data, isLoading, error } = useBanks();
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
			(b) =>
				b.name.toLowerCase().includes(q) ||
				b.fullName.toLowerCase().includes(q) ||
				String(b.code ?? '').includes(q),
		);
	}, [data, search]);

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	if (isLoading) return <LoadingSkeleton rows={10} />;
	if (error) return <ErrorAlert message={error.message} />;

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<CardTitle className="flex items-center gap-2">
						<Building2 className="w-5 h-5" />
						Bancos ({filtered.length})
					</CardTitle>
					<SearchInput
						placeholder="Buscar banco…"
						onSearch={handleSearch}
						className="sm:w-72"
					/>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Código</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="hidden md:table-cell">
								Nome completo
							</TableHead>
							<TableHead className="hidden sm:table-cell">ISPB</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.map((bank) => (
							<TableRow key={bank.ispb}>
								<TableCell>
									{bank.code != null ? (
										<Badge variant="secondary">{bank.code}</Badge>
									) : (
										<span className="text-[hsl(var(--muted-foreground))] text-xs">
											—
										</span>
									)}
								</TableCell>
								<TableCell className="font-medium">{bank.name}</TableCell>
								<TableCell className="hidden md:table-cell text-sm text-[hsl(var(--muted-foreground))]">
									{bank.fullName}
								</TableCell>
								<TableCell className="hidden sm:table-cell text-xs font-mono text-[hsl(var(--muted-foreground))]">
									{bank.ispb}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{/* Pagination */}
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
	);
}
