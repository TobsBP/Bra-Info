import { BankTable } from '@/components/banks/BankTable';

export default function BanksPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Bancos</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					Lista completa de instituições financeiras brasileiras
				</p>
			</div>
			<BankTable />
		</div>
	);
}
