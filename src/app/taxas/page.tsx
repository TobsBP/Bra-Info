import { TaxasView } from '@/components/taxas/TaxasView';

export default function TaxasPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Taxas de Juros</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					SELIC, CDI e demais taxas do sistema financeiro
				</p>
			</div>
			<TaxasView />
		</div>
	);
}
