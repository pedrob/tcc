import axios from 'axios';
import { SearchParams } from '../components/SearchForm';

const api = axios.create({
	baseURL: 'http://localhost:5000'
});


export interface APIResponse {
	termo: string;
	mencoes: number[];
	mencoesPositivas: number[];
	mencoesNegativas: number[];
	mencoesNeutras: number[];
	tweetsPositivos: {[key: string]: string[]},
	tweetsNegativos: {[key: string]: string[]},
	datas: string[];
	total: number;
}

export const getData = async (paramsData: SearchParams): Promise<APIResponse> => {
	const { data } = await api.post('/analizar', 
		{
			...paramsData, 
			qtdMax: parseInt(paramsData.qtdMax),
		}
	);
	return data;
};
