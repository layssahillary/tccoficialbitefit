import React from 'react';
import {
  ContainerSections,
  SectionImg,
  ContainerSectionChild,
  Title,
  PhraseSection,
  ContainerPage,
  ContainerArticleMid,
  PhraseArticleH2,
  DividerArticle,
  PhraseArticleP,
  GradientImg,
  SquareImg,
  SquareImg2,
  ContainerArticleEnd,
  ContainerCard,
  ContainerIcon,
  ContainerTitle,
  ContainerPhrase,
} from './initalPage.styles';

import { RoundButton } from '../../Button/RoundButton/index';
import gradientImg from '../../../imagens/decor/gradient.svg';
import squareImg from '../../../imagens/decor/ball.svg';

import pacientesIcon from '../../../imagens/icones/patients3D.png';
import consultaIcon from '../../../imagens/icones/calendar3D.png';
import perfilIcon from '../../../imagens/icones/profile3D.svg';

import ilustracaoSection from '../../../imagens/ilustração/illustrationSection.svg';

const InitialPageView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <ContainerPage>
        <GradientImg src={gradientImg} alt="Gradient Decor" />
        <SquareImg src={squareImg} alt="Square Decor" />
        <SquareImg2 src={squareImg} alt="Square Decor" />
        <ContainerSections>
          <ContainerSectionChild>
            <Title>{`Bem-vindo, ${user?.nome}!`}</Title>
            <PhraseSection>
            Explore uma abordagem inovadora para alimentação saudável, onde a facilidade e a criatividade se encontram em uma plataforma intuitiva e acessível.
            </PhraseSection>
            <RoundButton href="/nutricionistaCadastro" label={'Cadastrar Paciente'} />
          </ContainerSectionChild>
          <SectionImg src={ilustracaoSection} alt="Logo"></SectionImg>
        </ContainerSections>
        <ContainerArticleMid>
          <PhraseArticleH2>Veja também</PhraseArticleH2>
          <DividerArticle></DividerArticle>
          <PhraseArticleP>
          Amplie suas possibilidades e mergulhe mais fundo na plataforma Bitefit para descobrir recursos adicionais, dicas úteis e inspiração para alcançar seus objetivos de saúde e nutrição.
          </PhraseArticleP>
        </ContainerArticleMid>
        <ContainerArticleEnd>
          <ContainerCard href="/pacientes">
            <ContainerIcon src={pacientesIcon} alt="Gradient" />
            <ContainerTitle>Paciente</ContainerTitle>
            <ContainerPhrase>
            Explore seus pacientes e acompanhe seu progresso nutricional.
            </ContainerPhrase>
          </ContainerCard>
          <ContainerCard href="/consultas">
            <ContainerIcon src={consultaIcon} alt="Gradient" />
            <ContainerTitle>Consulta</ContainerTitle>
            <ContainerPhrase>
            Agende consultas e otimize sua jornada de nutrição.
            </ContainerPhrase>
          </ContainerCard>
          <ContainerCard href="/perfilNutricionista">
            <ContainerIcon src={perfilIcon} alt="Gradient" />
            <ContainerTitle>Perfil</ContainerTitle>
            <ContainerPhrase>
            Explore seu perfil e todas as suas informações de uma forma simplificada
            </ContainerPhrase>
          </ContainerCard>
        </ContainerArticleEnd>
      </ContainerPage>
      
    </>
  );
};

export default InitialPageView;
