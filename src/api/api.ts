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
	datas: string[];
	total: number;
}

const lenguageMap: {[key: string]:string} = {
	'Brasil': 'pt-br',
	'Estados Unidos': 'en'
}

export const getData = async (paramsData: SearchParams): Promise<APIResponse> => {
	const { data } = await api.post('/analizar', 
		{
			...paramsData, 
			qtdMax: parseInt(paramsData.qtdMax), 
			linguagem: lenguageMap[paramsData.pais]
		}
	);
	return data;
};
