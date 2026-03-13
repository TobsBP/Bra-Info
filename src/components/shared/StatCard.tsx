import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon: LucideIcon;
	className?: string;
	iconClassName?: string;
}

export function StatCard({
	title,
	value,
	description,
	icon: Icon,
	className,
	iconClassName,
}: StatCardProps) {
	return (
		<Card className={cn('border-[hsl(var(--border))]', className)}>
			<CardContent className="p-5">
				<div className="flex items-start justify-between gap-3">
					<div className="space-y-1 min-w-0">
						<p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
							{title}
						</p>
						<p className="text-2xl font-bold tracking-tight truncate">
							{value}
						</p>
						{description && (
							<p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
								{description}
							</p>
						)}
					</div>
					<div
						className={cn(
							'shrink-0 p-2.5 rounded-xl bg-[hsl(var(--primary))]/10',
							iconClassName,
						)}
					>
						<Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
