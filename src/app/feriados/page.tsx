import { FeriadosView } from '@/components/feriados/FeriadosView';

export default function FeriadosPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Feriados Nacionais</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					Calendário de feriados nacionais por ano
				</p>
			</div>
			<FeriadosView />
		</div>
	);
}
