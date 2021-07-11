import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;

	input {
		height: 35px;
		width: 100%;
		margin-top: 20px;
	}
	select {
		height: 40px;
		margin-top: 20px;
		margin-bottom: 20px;
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
		width: 49%;
	}
`;

export const SubmitButton = styled.button`
	width: 100px;
	height: 100%;
	margin: 0 auto;
	border-radius: 4px;
`;
