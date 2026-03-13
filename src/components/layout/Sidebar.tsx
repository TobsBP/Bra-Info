'use client';

import { BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
			{/* Logo */}
			<div className="flex items-center gap-3 px-5 py-5 border-b border-[hsl(var(--sidebar-border))]">
				<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--sidebar-primary))] to-[hsl(258,90%,56%)] shadow-lg">
					<BarChart3 className="w-4 h-4 text-white" />
				</div>
				<span className="font-semibold text-sm tracking-tight">
					{siteConfig.name}
				</span>
			</div>

			{/* Nav */}
			<nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
								isActive
									? 'bg-[hsl(var(--sidebar-primary))]/15 text-[hsl(var(--sidebar-primary))] font-medium'
									: 'text-[hsl(var(--sidebar-foreground))]/60 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]',
							)}
						>
							<Icon
								className={cn(
									'w-4 h-4 shrink-0 transition-colors',
									isActive
										? 'text-[hsl(var(--sidebar-primary))]'
										: 'text-[hsl(var(--sidebar-foreground))]/40',
								)}
							/>
							{item.title}
						</Link>
					);
				})}
			</nav>

			{/* Footer */}
			<div className="px-5 py-4 border-t border-[hsl(var(--sidebar-border))]">
				<p className="text-xs text-[hsl(var(--sidebar-foreground))]/30">
					Powered by{' '}
					<span className="text-[hsl(var(--sidebar-foreground))]/50 font-medium">
						BrasilAPI
					</span>
				</p>
			</div>
		</aside>
	);
}
