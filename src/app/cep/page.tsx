import { CepSearchForm } from '@/components/cep/CepSearchForm';

export default function CepPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Consulta de CEP</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1 text-sm">
					Busque endereços e coordenadas por CEP
				</p>
			</div>
			<CepSearchForm />
		</div>
	);
}
