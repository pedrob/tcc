import { Form, FormHeader, Line } from './styles';
import { Collapse } from 'reactstrap';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

interface SearchParams {
	termo: string;
	dataInicio: string;
	dataFim: string;
	pais: string;
	linguagem: string;
	qtdMax: number;
}

interface IProps {
	searchFunction?: (params: SearchParams) => void;
}

const SearchForm = ({ searchFunction }: IProps) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const { register, handleSubmit, formState: { errors } } = useForm<
		SearchParams
	>();

	const onSubmit: SubmitHandler<SearchParams> = (data) => console.log(data);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormHeader>
				<span>
					<strong>Parâmetros de busca</strong>
				</span>
				<button onClick={toggle}>abrir</button>
			</FormHeader>
			<Collapse isOpen={isOpen}>
				<input
					{...(register('termo'), { required: true })}
					placeholder="Termo de busca"
				/>
				<Line>
					<input
						{...register('dataInicio', { required: true })}
						type="text"
						onFocus={(e) => {
							e.currentTarget.type = 'date';
							e.currentTarget.focus();
						}}
						placeholder="Data de início"
					/>
					<input
						{...register('dataFim', { required: true })}
						type="text"
						onFocus={(e) => {
							e.currentTarget.type = 'date';
							e.currentTarget.focus();
						}}
						placeholder="Data de fim"
					/>
				</Line>
				<Line>
					<select {...register('pais')}>
						<option>País da busca</option>
						<option value="Brasil">Brasil</option>
						<option value="USA">Estados Unidos</option>
					</select>
					<select {...register('qtdMax')}>
						<option>Quantidade Máxima de tweets</option>
						<option value={100}>100</option>
						<option value={1000}>1000</option>
						<option value={10000}>10000</option>
					</select>
				</Line>
				<input type="submit" />
			</Collapse>
		</Form>
	);
};

export default SearchForm;
