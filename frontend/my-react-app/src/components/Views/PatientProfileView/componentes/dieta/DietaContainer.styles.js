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

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: bold;
  }


  input[type='date'],
  input[type='time'] {
    font-size: 16px;
    align-self: center;
    border: 1px solid #c7ddcc;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    font-family: 'Nunito Sans';
    transition: border-color 0.3s;
  }

  input[type='text']{
  padding-left: 5px;
    font-size: 16px;
    align-self: center;
    border: 1px solid #c7ddcc;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    font-family: 'Nunito Sans';
    transition: border-color 0.3s;
  }

  input[type='date'] {
    text-align: center; /* Centraliza o texto */
  }

  &::placeholder {
    color: #e0e0e0;
    font-family: 'Nunito Sans';
    font-size: 14px;
    padding-left: 10px;
  }

  &:focus {
    box-shadow: 0 0 0 0.1rem #8fba98;
    outline: none;
  }
`;

export const RefeicaoButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  border-radius: 0.5rem;
  border: 1px solid #c7ddcc;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  margin: 6px;
  width: 100%;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  color: #5f8d4e;
  font-family: 'Mulish';
  font-weight: 400;
  padding: 10px;

  img {
    width: 3rem;
    height: 3rem;
    fill: #494949;
    margin-bottom: 5px;
  }

  &:hover {
    border-color: #5f8d4e;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
  margin-top: 10px;
`;

export const ContainerRefeicaoBloco = styled.div`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

export const ContainerMainRefeicao = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 10px;

  img {
    width: 30px;
  }
  h2 {
    color: #285430;
    font-family: 'Mulish';
    font-size: 18px;
    font-weight: 400;
  }
  p,
  label {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
  }

  input[type='time'] {
    text-align: center; /* Centraliza o texto */
    width: 150px;
    font-size: 18px;
  }
`;

export const ContainerMainIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContainerHourRefeicao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p,
  label {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
  }
`;

export const DietIcon = styled.img`
  width: 340px;
`;

export const IconButtonClose = styled.button`
  background: none;
  border: 1px solid red;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  align-self: end;
  color: red;
  margin-bottom: 20px;

  &:hover {
    background-color: #ffeeee;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }
`;

export const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const ContainerCloseButton = styled.div`
  display: flex;
  justify-content: end;
`;

export const IconButtonAdd = styled.button`
  background: none;
  border: 1px solid #25cb67;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  align-self: end;
  color: #25cb67;
  margin-bottom: 20px;

  &:hover {
    background-color: #eefff5;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }
`;

export const AddIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const ContainerAddButton = styled.div`
  display: flex;
  justify-content: end;
`;

export const ContainerMain = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #fff;
  padding: 30px;
  border-radius: 30px;
  gap: 20px;

  color: #7d7987;

  h1 {
    color: #285430;
    font-family: 'Mulish';
    font-size: 24px;
    font-weight: 700;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
  }
`;
export const ContainerStart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DateContainerFull = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  border: 1px solid #c7ddcc;
  padding: 20px;
  width: 330px;
  margin: 0px 200px 0px 200px;
  border-radius: 30px;
`;

export const ContainerAlimentos = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
  
  label {
    font-family: 'Mulish';
    font-size: 18px;
    color: #285430;
    font-weight: 400;
  }

 
  &::placeholder {
    color: #e0e0e0;
    font-family: 'Nunito Sans';
    font-size: 14px;
    padding-left: 10px;
  }
  
  input[type='text'] {
    width: 160px;
    font-size: 18px;
  }
`;
