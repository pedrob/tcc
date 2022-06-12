import { Form, FormHeader, Line, SubmitButton } from './styles';
import { Collapse } from 'reactstrap';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

export interface SearchParams {
	termo: string;
	startDate: string;
	endDate: string;
	qtdMax: string;
}

interface IProps {
	searchFunction: (params: SearchParams) => void;
}

const SearchForm = ({ searchFunction }: IProps) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const { register, handleSubmit } = useForm<SearchParams>();

	const onSubmit: SubmitHandler<SearchParams> = (data:any) => searchFunction(data);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormHeader onClick={toggle}>
				<span>
					<strong>Search params</strong>
				</span>
				{!isOpen ? (
					<FiChevronDown size={35} cursor={"pointer"} onClick={toggle} color={"#56C0A2"} />
				) : (
					<FiChevronUp size={35} cursor={"pointer"} onClick={toggle} color={"#56C0A2"} />
				)}
			</FormHeader>
			<Collapse isOpen={isOpen}>
				<input
					{...(register('term', { required: true}))}
					placeholder="Search term"
				/>
				<Line>
					<input
						{...register('startDate', { required: true })}
						type="text"
						onFocus={(e) => {
							e.currentTarget.type = 'date';
							e.currentTarget.focus();
						}}
						placeholder="Start date"
					/>
					<input
						{...register('endDate', { required: true })}
						type="text"
						onFocus={(e) => {
							e.currentTarget.type = 'date';
							e.currentTarget.focus();
						}}
						placeholder="End date"
					/>
					<select {...register('qtdMax')}>
						<option>Max quantity of tweets</option>
						<option value={100}>100</option>
						<option value={1000}>1000</option>
						<option value={10000}>10000</option>
					</select>
				</Line>
				<div style={{width: '100%', display: 'flex', height: 35}}>
					<SubmitButton type="submit">Search tweets</SubmitButton>
				</div>
			</Collapse>
		</Form>
	);
};

export default SearchForm;
