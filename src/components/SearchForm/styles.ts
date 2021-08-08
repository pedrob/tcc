import styled from 'styled-components';
import { Button } from 'reactstrap';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 15px 30px;
	span {
		strong {
			font-size: 18px;
		}
	}
	input {
		height: 35px;
		width: 100%;
		margin-top: 20px;
		border: 1px solid #56C0A2;
		padding: 0 4px;
		border-radius: 4px;
	}
	select {
		height: 35px;
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid #56C0A2;
		background-color: #fff;
		border-radius: 4px;
	}
`;

export const FormHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Line = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	input,
	select {
		width: 32%;
		border: 1px solid #56C0A2;
	}
`;

export const SubmitButton = styled(Button)`
	width: 100px;
	height: 100%;
	margin: 0 auto;
	border-radius: 4px;
	background-color: #56C0A2;
	border-style: none;
`;
