import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ContainerSection = styled.section`
  display: flex;
  background-color: #f0f2f4;
  border-radius: 30px;
  padding: 30px;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const ContainerIntro = styled.div`
  display: flex;
  gap: 40px;
`;

export const Img = styled.div`
  width: 150px;
  height: 150px;
  background-color: aquamarine;
`;

export const ContainerInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
`;

export const Data = styled.div`
  display: flex;
  gap: 50px;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
  }

  h1 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const Information = styled.div`
  display: flex;
  gap: 10px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
    text-align: justify;
  }

  h2 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const ContainerGoal = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  border: 1px solid #f0f2f4;
  border-radius: 20px;
  padding: 20px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #285430;
    text-align: justify;
  }

  h2 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const Divider = styled.span`
  width: 100%;
  height: 1px;
  background-color: gray;
`;

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const ContainerBlocks = styled.div`
  background-color: #ffffff;
  border: 1px solid #f0f2f4;
  border-radius: 20px;
  padding: 20px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
    text-align: justify;
  }

  h2 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const ContainerTitleImg = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const ImgBlock = styled.img`
  width: 40px;
`;

export const ImgProfile = styled.img`
  width: 150px;
  height: auto;
  border-radius: 15%;
`;
