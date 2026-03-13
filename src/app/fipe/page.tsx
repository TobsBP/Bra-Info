import { Car, Fuel, Info, Tag } from 'lucide-react';
import { FipeWizard } from '@/components/fipe/FipeWizard';

export default function FipePage() {
	return (
		<div className="space-y-8">
			{/* Hero */}
			<div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(222,47%,11%)] to-[hsl(239,60%,22%)] p-8 text-white">
				{/* decorative circles */}
				<div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-[hsl(var(--primary))]/10" />
				<div className="absolute -right-4 top-16 w-32 h-32 rounded-full bg-[hsl(var(--primary))]/10" />

				<div className="relative">
					<div className="flex items-center gap-2 mb-3">
						<div className="p-2 rounded-lg bg-[hsl(var(--primary))]/20">
							<Car className="w-5 h-5 text-[hsl(var(--primary))]" />
						</div>
						<span className="text-sm font-medium text-white/60 uppercase tracking-widest">
							Tabela FIPE
						</span>
					</div>
					<h1 className="text-3xl font-bold mb-2">Preço médio de veículos</h1>
					<p className="text-white/60 text-sm max-w-lg">
						Consulte o valor de referência de carros, motos e caminhões
						publicado mensalmente pela Fundação Instituto de Pesquisas
						Econômicas.
					</p>
				</div>
			</div>

			{/* Info chips */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{[
					{
						icon: Tag,
						title: 'Código FIPE',
						desc: 'Identificador único de cada modelo e versão na tabela oficial.',
					},
					{
						icon: Fuel,
						title: 'Combustível',
						desc: 'Gasolina, etanol, flex, diesel, GNV e elétrico discriminados.',
					},
					{
						icon: Info,
						title: 'Referência mensal',
						desc: 'Valores atualizados todo mês com base em pesquisa de mercado.',
					},
				].map(({ icon: Icon, title, desc }) => (
					<div
						key={title}
						className="flex gap-3 p-4 rounded-xl border bg-[hsl(var(--card))] shadow-sm"
					>
						<div className="shrink-0 mt-0.5 p-2 rounded-lg bg-[hsl(var(--primary))]/10">
							<Icon className="w-4 h-4 text-[hsl(var(--primary))]" />
						</div>
						<div>
							<p className="text-sm font-semibold">{title}</p>
							<p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-relaxed">
								{desc}
							</p>
						</div>
					</div>
				))}
			</div>

			<FipeWizard />
		</div>
	);
}
