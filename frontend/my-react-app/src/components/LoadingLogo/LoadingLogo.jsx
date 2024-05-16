import React from 'react'
import {Container,Image} from './loadingLogo.styles'
import logoBiteFit from '../../imagens/logoBiteFit/logoBiteFit.svg';

const LoadingLogo = () => {
  return (
    <Container>
      <Image src={logoBiteFit} alt="BiteFit" />
    </Container>
  );
}

export default LoadingLogo
