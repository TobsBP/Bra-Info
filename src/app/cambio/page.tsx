import { CambioView } from '@/components/cambio/CambioView';

export default function CambioPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Câmbio</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					Taxas de câmbio em tempo real
				</p>
			</div>
			<CambioView />
		</div>
	);
}
