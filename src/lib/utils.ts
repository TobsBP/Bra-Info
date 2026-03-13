import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = 'BRL'): string {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(
		value,
	);
}

export function formatCep(cep: string): string {
	return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatCnpj(cnpj: string): string {
	return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
