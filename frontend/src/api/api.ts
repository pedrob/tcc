import axios from 'axios';
import { SearchParams } from '../components/SearchForm';

const api = axios.create({
	baseURL: 'http://localhost:5000'
});


export interface APIResponse {
	term: string;
	mentions: number[];
	positiveMentions: number[];
	negativeMentions: number[];
	neutralMentions: number[];
	positiveTweets: {[key: string]: string[]},
	negativeTweets: {[key: string]: string[]},
	dates: string[];
	total: number;
}

export const getData = async (paramsData: SearchParams): Promise<APIResponse> => {
	const { data } = await api.post('/analyze', 
		{
			...paramsData, 
			qtdMax: parseInt(paramsData.qtdMax),
		}
	);
	return data;
};
