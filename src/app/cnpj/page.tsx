import { CnpjSearchForm } from '@/components/cnpj/CnpjSearchForm';

export default function CnpjPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Consulta de CNPJ</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					Dados completos de empresas cadastradas na Receita Federal
				</p>
			</div>
			<CnpjSearchForm />
		</div>
	);
}
