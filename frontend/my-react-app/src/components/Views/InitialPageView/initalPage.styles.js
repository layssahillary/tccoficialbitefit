import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ContainerPage = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 100px;
`;

export const ContainerSections = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GradientImg = styled.img`
  position: absolute;
  top: -100px;
  z-index: -1;
`;

export const SquareImg = styled.img`
  position: absolute;
  right: 0;
  z-index: -1;
`;

export const SquareImg2 = styled.img`
  position: absolute;
  left: 0;
  bottom: -300px;
  z-index: -1;
`;

export const SectionImg = styled.img`
  animation: ${fadein} 1s ease-in-out;
`;

export const ContainerSectionChild = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 500px;
`;

export const Title = styled.h1`
  font-family: 'Mulish';
  font-weight: 700px;
  font-size: 48px;
  color: #285430;
  animation: ${fadein} 1s ease-in-out;
`;

export const PhraseSection = styled.p`
  font-family: 'Mulish';
  font-size: 20px;
  font-weight: 300px;
  color: #7d7987;
`;
export const ContainerArticleMid = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  max-width: 900px;
  margin: auto;
  text-align: center;
`;

export const PhraseArticleH2 = styled.h2`
  font-family: 'Mulish';
  font-weight: 700px;
  font-size: 38px;
  color: #285430;
`;

export const DividerArticle = styled.span`
  width: 50px;
  height: 2px;
  background-color: #285430;
  margin: 10px 0;
`;

export const PhraseArticleP = styled.p`
  font-family: 'Mulish';
  font-size: 18px;
  font-weight: 300px;
  color: #7d7987;
`;

export const ContainerArticleEnd = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-bottom: 60px;
`;

export const ContainerCard = styled.a`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  width: 300px;
  height: 300px;
  padding: 38px;
  border-radius: 20px;
  border: 0.5px solid #f2f2f2;
  box-shadow: rgba(229, 233, 246, 0.7) 0px 18px 50px -10px;
  background-color: #ffffff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    box-shadow: rgba(131, 149, 135, 0.5) 0px 1px 0px;
  }
`;

export const ContainerIcon = styled.img`
  width: 90px;
  height: 90px;
`;

export const ContainerTitle = styled.h2`
  font-family: 'Mulish';
  font-size: 24px;
  font-weight: 500px;
  color: #285430;
`;

export const ContainerPhrase = styled.p`
  font-family: 'Mulish';
  font-size: 16px;
  font-weight: 300px;
  color: #877982;
`;
