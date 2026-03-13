'use client';

import { BarChart3, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/config/nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="md:hidden">
			<Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
				<Menu className="w-5 h-5" />
			</Button>

			{open && (
				<div className="fixed inset-0 z-50 flex">
					{/* Backdrop */}
					<button
						type="button"
						aria-label="Fechar menu"
						className="absolute inset-0 bg-black/60 cursor-default backdrop-blur-sm"
						onClick={() => setOpen(false)}
					/>
					{/* Sheet */}
					<aside className="relative w-72 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col">
						<div className="flex items-center justify-between px-5 py-5 border-b border-[hsl(var(--sidebar-border))]">
							<div className="flex items-center gap-3">
								<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[hsl(var(--sidebar-primary))] to-[hsl(258,90%,56%)]">
									<BarChart3 className="w-4 h-4 text-white" />
								</div>
								<span className="font-semibold text-sm tracking-tight">
									{siteConfig.name}
								</span>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setOpen(false)}
								className="text-[hsl(var(--sidebar-foreground))]/60 hover:text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
							>
								<X className="w-4 h-4" />
							</Button>
						</div>
						<nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
							{navItems.map((item) => {
								const Icon = item.icon;
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setOpen(false)}
										className={cn(
											'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
											isActive
												? 'bg-[hsl(var(--sidebar-primary))]/15 text-[hsl(var(--sidebar-primary))] font-medium'
												: 'text-[hsl(var(--sidebar-foreground))]/60 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]',
										)}
									>
										<Icon
											className={cn(
												'w-4 h-4 shrink-0',
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
					</aside>
				</div>
			)}
		</div>
	);
}
