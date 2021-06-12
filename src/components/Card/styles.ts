import styled from 'styled-components';

export interface ContainerProps {
  width?: string;
  height?: string;
  background?: string;
}

export const Container = styled.div`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.20);
  border-radius: 4px;
  padding: 10px;
  width: ${({ width }: ContainerProps) => width ? width : 'auto'};
  height: ${({ height }: ContainerProps) => height ? height : 'auto'};
  background-color: ${({ background }: ContainerProps) => background ? background : '#fff'};
`;
