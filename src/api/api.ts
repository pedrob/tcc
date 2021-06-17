import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000/'
});

export interface APIResponse {
	termo: string;
	mencoes: number[];
	mencoesPositivas: number[];
	mencoesNegativas: number[];
	mencoesNeutras: number[];
	datas: string[];
	total: number;
}

export const getData = async (): Promise<APIResponse> => {
	const { data } = await api.post('analizar', {
		termo: 'Bolsonaro Presidente 2022',
		dataInicio: '2019-01-01',
		dataFim: '2021-05-01',
		pais: 'Brasil',
		linguagem: 'pt-br',
		qtdMax: 1000,
		metodoAnalise: 'vader'
	});
	console.log('Data', data);
	return data;
};
