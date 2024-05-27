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

  h2 {
    color: #285430;
    font-family: 'Mulish';
    font-size: 24px;
    font-weight: 700;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
`;
export const InputField = styled.input`
    padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  color: #285430;
  font-family: 'Nunito Sans';

  &::placeholder {
    color: #e0e0e0;
    font-family: 'Nunito Sans';
    font-size: 14px;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem #8fba98;
    outline: none; 
  }
`;
export const ContainerTitleImg = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const FirstRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;

export const FirstRowBlocks = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  padding: 20px;

  p:first-child {
    font-family: 'Mulish';
    font-size: 24px;
    color: #242424;
    font-weight: 700;
    text-align: justify;
    margin-top: auto;
  }

  p:last-child {
    font-family: 'Mulish';
    font-size: 16px;
    color: #777777;
    text-align: justify;
    margin-top: auto;
  }

  h2 {
    color: #777777;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const ImgBlock = styled.img`
  width: 40px;
`;
export const DataContainer = styled.div`
  display: flex;
  gap: 5px;
  padding-top: 30px;
`;

export const SecondRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

export const SecondRowBlocks = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  padding: 20px; 

  p:first-child {
    font-family: 'Mulish';
    font-size: 24px;
    color: #242424;
    font-weight: 700;
    text-align: justify;
    margin-top: auto;
  }

  p:last-child {
    font-family: 'Mulish';
    font-size: 16px;
    color: #777777;
    text-align: justify;
    margin-top: auto;
  }

  h2 {
    color: #777777;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
export const ContainerSecondRowTitleImg = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  gap: 10px;
  align-items: center;
`;
export const ThirdRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
`;
export const ThirdRowBlocks = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  padding: 20px;

  p:first-child {
    font-family: 'Mulish';
    font-size: 24px;
    color: #242424;
    font-weight: 700;
    text-align: justify;
    margin-top: auto;
  }

  p:last-child {
    font-family: 'Mulish';
    font-size: 16px;
    color: #777777;
    text-align: justify;
    margin-top: auto;
  }

  h2 {
    color: #777777;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const FourthRowContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  flex-direction: column;

  h2 {
    color: #777777;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const ImgPContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const FourthImgBlock = styled.img``;

export const PContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-top: 25px;
  gap: 5px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #242424;
    font-weight: 700;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;
