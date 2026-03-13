'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
	placeholder?: string;
	onSearch: (value: string) => void;
	debounceMs?: number;
	className?: string;
}

export function SearchInput({
	placeholder = 'Pesquisar…',
	onSearch,
	debounceMs = 300,
	className,
}: SearchInputProps) {
	const [value, setValue] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => onSearch(value), debounceMs);
		return () => clearTimeout(timer);
	}, [value, debounceMs, onSearch]);

	return (
		<div className={cn('relative', className)}>
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="pl-9"
			/>
		</div>
	);
}
