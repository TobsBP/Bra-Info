'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/nav';
import { MobileNav } from './MobileNav';

export function Header() {
	const pathname = usePathname();
	const current = navItems.find((item) => item.href === pathname);
	const Icon = current?.icon;

	return (
		<header className="sticky top-0 z-40 flex h-14 items-center border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md px-4 md:px-6 gap-3">
			<MobileNav />
			<nav className="flex items-center gap-1.5 text-sm">
				<Link
					href="/"
					className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
				>
					<Home className="w-4 h-4" />
				</Link>
				{current && current.href !== '/' && (
					<>
						<ChevronRight className="w-3 h-3 text-[hsl(var(--muted-foreground))]/50" />
						<div className="flex items-center gap-1.5 text-[hsl(var(--foreground))] font-medium">
							{Icon && (
								<Icon className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
							)}
							{current.title}
						</div>
					</>
				)}
			</nav>
		</header>
	);
}
