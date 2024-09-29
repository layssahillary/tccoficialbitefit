import React from 'react';
import {
  FooterWrapper,
  ResumoContainer,
  Logo,
  ResumoP,
  ConteinerUl,
  ConteinerLi,
  ConteinerItem,
  ListaLinks,
} from './Footer.styles'; 
import logoBiteFit from '../../imagens/logoBiteFit/logoBiteFit.svg'; 

const Footer = () => {
  return (
    <FooterWrapper>
      <ResumoContainer>
        <Logo src={logoBiteFit} alt="Logo" />
        <ResumoP>
          BiteFit, um sistema inteligente projetado para otimizar a comunicação
          entre nutricionistas e pacientes, visando uma jornada de saúde e
          bem-estar mais eficiente e personalizada.
        </ResumoP>
        <ResumoP>© 2024 BiteFit. All rights reserved</ResumoP>
      </ResumoContainer>
      <ListaLinks>
        <ConteinerUl>
        </ConteinerUl>
        <ConteinerUl>
          <ConteinerLi>
            <ConteinerItem href="/">Inicio</ConteinerItem>
          </ConteinerLi>
          <ConteinerLi>
            <ConteinerItem href="/consulta">Consultas</ConteinerItem>
          </ConteinerLi>
          <ConteinerLi>
            <ConteinerItem href="/paciente">Pacientes</ConteinerItem>
          </ConteinerLi>
          <ConteinerLi>
            <ConteinerItem href="/perfil">Perfil</ConteinerItem>
          </ConteinerLi>
          <ConteinerLi>
            <ConteinerItem href="/dieta">Dieta</ConteinerItem>
          </ConteinerLi>
        </ConteinerUl>
      </ListaLinks>
    </FooterWrapper>
  );
};

export default Footer;
