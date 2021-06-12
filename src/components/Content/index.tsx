import React from 'react';
import { ReactNode } from 'react';

import { Container } from './styles';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Content;