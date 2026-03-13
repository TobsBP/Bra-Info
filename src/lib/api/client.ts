import axios from 'axios';

export const brasilApiClient = axios.create({
	baseURL: '/api',
	timeout: 15_000,
});

brasilApiClient.interceptors.response.use(
	(res) => res,
	(error) => {
		const message =
			error.response?.data?.message ??
			error.response?.data?.type ??
			error.message ??
			'Erro desconhecido';
		return Promise.reject(new Error(message));
	},
);
