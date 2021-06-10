import React, { ReactNode } from 'react';

import { Container } from './styles';

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Card;