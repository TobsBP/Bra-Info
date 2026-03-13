'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CepMap } from '@/components/cep/CepMapWrapper';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCep } from '@/lib/hooks/useCep';
import { formatCep } from '@/lib/utils';

const schema = z.object({
	cep: z
		.string()
		.transform((v) => v.replace(/\D/g, ''))
		.pipe(z.string().length(8, 'CEP deve ter 8 dígitos')),
});

type FormData = z.infer<typeof schema>;

export function CepSearchForm() {
	const [activeCep, setActiveCep] = useState<string | null>(null);
	const { data, isLoading, error } = useCep(activeCep);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (formData: FormData) => setActiveCep(formData.cep);

	const coords = data?.location?.coordinates?.latitude
		? {
				latitude: data.location.coordinates.latitude,
				longitude: data.location.coordinates.longitude,
			}
		: null;

	const popupLabel = data
		? [data.street, data.city, data.state].filter(Boolean).join(', ')
		: undefined;

	return (
		<div className="space-y-6">
			{/* Search */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2 text-base">
						<MapPin className="w-4 h-4 text-[hsl(var(--primary))]" />
						Consultar CEP
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
						<div className="flex-1">
							<Input
								placeholder="Ex: 01310-100"
								maxLength={9}
								{...register('cep')}
							/>
							{errors.cep && (
								<p className="text-xs text-[hsl(var(--destructive))] mt-1">
									{errors.cep.message}
								</p>
							)}
						</div>
						<Button type="submit">Buscar</Button>
					</form>
				</CardContent>
			</Card>

			{isLoading && <LoadingSkeleton rows={4} />}
			{error && <ErrorAlert message={error.message} />}

			{/* Map + result side by side */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Map */}
				<Card className="overflow-hidden">
					<div className="h-[420px]">
						<CepMap coords={coords} label={popupLabel} />
					</div>
				</Card>

				{/* Address data */}
				{data ? (
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-mono">
								{formatCep(data.cep)}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{[
								{ label: 'Logradouro', value: data.street },
								{ label: 'Bairro', value: data.neighborhood },
								{ label: 'Cidade', value: data.city },
								{ label: 'Estado', value: data.state },
								{ label: 'Serviço', value: data.service },
							].map(
								({ label, value }) =>
									value && (
										<div key={label}>
											<p className="text-xs text-[hsl(var(--muted-foreground))] font-medium uppercase tracking-wide">
												{label}
											</p>
											<p className="font-medium mt-0.5">{value}</p>
										</div>
									),
							)}

							{coords && (
								<div>
									<p className="text-xs text-[hsl(var(--muted-foreground))] font-medium uppercase tracking-wide flex items-center gap-1">
										<Navigation className="w-3 h-3" />
										Coordenadas
									</p>
									<p className="font-mono text-sm mt-0.5 text-[hsl(var(--muted-foreground))]">
										{coords.latitude}, {coords.longitude}
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				) : (
					<Card className="flex items-center justify-center h-[420px]">
						<div className="text-center space-y-2">
							<MapPin className="w-10 h-10 text-[hsl(var(--muted-foreground))]/30 mx-auto" />
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								Busque um CEP para ver os detalhes
							</p>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
}
