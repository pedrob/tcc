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
	}
`;

export const FormHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* height: 60px; */
	padding: 12px 0;
	/* background-color: red; */
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
