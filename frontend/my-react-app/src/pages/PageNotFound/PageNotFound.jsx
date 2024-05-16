import React from 'react'

import ilustracao404 from '../../imagens/ilustração/404.gif';

import { ContainerImg } from './PageNotFound.styles';

const NotFoundPage = () => {
  return (
    <ContainerImg>
    <p>Volte para a Pagina de <a href="/login">LOGIN</a> </p>
    <img src={ilustracao404} alt="ilustracao 404"></img>
    </ContainerImg>
  )
}

export default NotFoundPage