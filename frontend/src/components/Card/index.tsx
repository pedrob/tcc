import React, { ReactNode } from 'react';

import { Container, ContainerProps } from './styles';

interface Props extends ContainerProps {
  children: ReactNode;
}

const Card = ({ children, ...props }: Props) => {
  return (
    <Container {...props} >
      {children}
    </Container>
  );
}

export default Card;