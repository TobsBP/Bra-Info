import { PixView } from '@/components/pix/PixView';

export default function PixPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Participantes PIX</h1>
				<p className="text-[hsl(var(--muted-foreground))] mt-1">
					Instituições habilitadas para transações via PIX
				</p>
			</div>
			<PixView />
		</div>
	);
}
