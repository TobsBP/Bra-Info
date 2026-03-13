import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
	rows?: number;
}

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
	return (
		<div className="space-y-3">
			{Array.from({ length: rows }, (_, i) => i).map((n) => (
				<Skeleton key={n} className="h-12 w-full" />
			))}
		</div>
	);
}

export function CardSkeleton() {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{Array.from({ length: 3 }, (_, i) => i).map((n) => (
					<Skeleton key={n} className="h-28 w-full rounded-xl" />
				))}
			</div>
			<Skeleton className="h-64 w-full rounded-xl" />
		</div>
	);
}
