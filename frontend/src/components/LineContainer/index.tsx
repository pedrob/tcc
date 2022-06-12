import React, { ReactNode } from 'react';

import { Container } from './styles';

interface Props {
  children: ReactNode;
}

const LineContainer = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default LineContainer;