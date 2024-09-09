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
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  margin: 40px 200px;
`;

export const ContainerIntro = styled.div`
  display: flex;
  gap: 10px;
`;

export const Img = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 10px;
`;

export const ContainerInfos = styled.div`
  display: flex;
  gap: 40px;
  padding: 0px 30px 30px 30px;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  justify-content: space-between;
`;

export const Data = styled.div`
  display: flex;
  gap: 50px;
  align-items: end;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;

  h2 {
    font-family: 'Mulish';
    font-size: 18px;
    color: #a1a1a1;
    font-weight: 300;
  }

  h1 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 40px;
    font-weight: 700;
  }
`;

export const Information = styled.div`
  display: flex;
  gap: 10px;
  border: 1px solid #1ec862;
  border-radius: 20px;
  padding: 15px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
    text-align: justify;
  }

  h2 {
    color: #1ec861;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
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

export const ContainerBlocksFirst = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #f0f2f4;
  border-radius: 20px;
  padding: 20px;
  gap: 40px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  h3 {
    color: #5dbbfc;
    font-size: 16px;
  }

  p {
    font-family: 'Mulish';
    font-size: 18px;
    color: #7d7987;
  }
`;

export const ContainerBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const ContainerTitleImg = styled.div`
  display: flex;
  gap: 20px;
`;

export const ImgBlock = styled.img`
  width: 40px;
`;

export const FirstBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #f0f2f4;
  border-radius: 20px;
  padding: 30px;
  height: 250px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const SecondBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #ffffff;
  border: 1px solid #f0f2f4;
  border-radius: 20px;
  padding: 20px;
  height: 100px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  img {
    width: 25px;
    height: 25px;
  }
  p {
    font-family: 'Mulish';
    font-size: 20px;
    color: #7d7987;
  }
`;
export const ContainerTitleImgDaily = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-family: 'Mulish';
    font-weight: 400px;
    font-size: 26px;
    color: #554ee0;
  }
`;

export const ContainerWeek = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 30px;
  gap: 10px;
  margin-top: 20px;

  p {
    font-family: 'Mulish';
    font-weight: 400px;
    font-size: 26px;
    color: #554ee0;
    border: 1px solid #554ee0;
    border-radius: 20px;
    padding: 10px;
  }
`;
export const ContainerHour = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  p {
    font-family: 'Mulish';
    font-weight: 400px;
    font-size: 20px;
    color: #554ee0;
  }

  h3 {
    font-family: 'Mulish';
    font-weight: 300px;
    font-size: 20px;
    color: #777777;
  }
`;
export const ContainerEmail = styled.div`
  display: flex;
  gap: 20px;
`;
export const ContainerNascimento = styled.div`
  display: flex;
  gap: 20px;
`;

export const ContainerTwo = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContainerEnd = styled.div`
  display: flex;
  gap: 20px;
`;
export const ContainerEspecialidade = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid #fb9b44;
  padding: 40px;
  border-radius: 20px;

  h2 {
    color: #fb9b44;
  }
`;

export const ContainerLinks = styled.div`
  display: flex;
  gap: 20px;
  border: 1px solid #7d7987;
  padding: 15px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background-color: #ededee;
  }

  a {
    text-decoration: none;
  }
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

export const WeekdayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const Weekday = styled.div`
  padding: 10px;
  margin-right: 5px;
  border-radius: 10px;
  background-color: ${({ isWorkingDay, isSelected, editMode }) =>
    editMode
      ? isSelected
        ? '#d3d3d3' // Cinza claro no modo de edição
        : 'transparent'
      : isWorkingDay
      ? '#7066FF' // Roxo no modo de visualização
      : 'transparent'};
  color: ${({ isWorkingDay, isSelected, editMode }) =>
    editMode
      ? isSelected
        ? 'black' // Cor preta no modo de edição
        : 'black'
      : isWorkingDay
      ? 'white' // Cor branca no modo de visualização
      : 'black'};
  cursor: ${({ editMode }) => (editMode ? 'pointer' : 'default')};

  &:hover {
    background-color: ${({ isSelected, editMode }) =>
      editMode && !isSelected ? '#f0f0f0' : ''}; // Somente no modo de edição
  }
`;


export const ContainerButton = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
`;


