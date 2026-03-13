import { useQuery } from '@tanstack/react-query';
import {
	fetchFipeAnos,
	fetchFipeMarcas,
	fetchFipeModelos,
	fetchFipePreco,
	fetchFipePrecoWizard,
} from '@/lib/api/fipe';

export function useFipeMarcas(tipo: string) {
	return useQuery({
		queryKey: ['fipe', 'marcas', tipo],
		queryFn: () => fetchFipeMarcas(tipo),
		staleTime: Infinity,
		enabled: !!tipo,
	});
}

export function useFipeModelos(tipo: string, marca: string) {
	return useQuery({
		queryKey: ['fipe', 'modelos', tipo, marca],
		queryFn: () => fetchFipeModelos(tipo, marca),
		staleTime: Infinity,
		enabled: !!tipo && !!marca,
	});
}

export function useFipeAnos(tipo: string, marca: string, modelo: string) {
	return useQuery({
		queryKey: ['fipe', 'anos', tipo, marca, modelo],
		queryFn: () => fetchFipeAnos(tipo, marca, modelo),
		staleTime: Infinity,
		enabled: !!tipo && !!marca && !!modelo,
	});
}

export function useFipePrecoWizard(
	tipo: string,
	marca: string,
	modelo: string,
	ano: string,
) {
	return useQuery({
		queryKey: ['fipe', 'preco', tipo, marca, modelo, ano],
		queryFn: () => fetchFipePrecoWizard(tipo, marca, modelo, ano),
		staleTime: Infinity,
		enabled: !!tipo && !!marca && !!modelo && !!ano,
	});
}

// BrasilAPI direct code lookup
export function useFipePreco(codigo: string) {
	return useQuery({
		queryKey: ['fipe', 'preco', codigo],
		queryFn: () => fetchFipePreco(codigo),
		staleTime: Infinity,
		enabled: !!codigo,
	});
}
