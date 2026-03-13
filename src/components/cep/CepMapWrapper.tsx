'use client';

import dynamic from 'next/dynamic';

const CepMap = dynamic(() => import('./CepMap').then((m) => m.CepMap), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full rounded-xl bg-[hsl(var(--muted))] animate-pulse" />
	),
});

export { CepMap };
