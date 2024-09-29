import styled from 'styled-components';

export const ContainerDatas = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 200px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 10px;
`;

export const ContainerTitleMain = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
`;

export const DataIconMedidas = styled.img`
  width: 100px;
  height: 100px;
`;

export const DataIcon = styled.img`
  margin-right: 10px;
`;
export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Phrase = styled.p`
  color: #525252;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
`;

export const Title = styled.h1`
  color: #285430;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
`;

export const ContainerInputs = styled.div``;

export const ContainerDivFirst = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
`;

export const ContainerDivSecond = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
`;

export const ContainerDivThird = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const ContainerDivFourst = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
`;

export const ContainerDivTwo = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const ContainerPrincipal = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const Label = styled.label`
  font-family: 'Nunito Sans';
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
  color: #828282;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  height: 30px;
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

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const ContainerDataIlustration = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerInputsIlustration = styled.div`
  display: flex;
  width: 100px;
  flex-direction: column;
  gap: 50px;
  padding-left: 40px;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 200px 20px 200px;
`;

export const SquareImg = styled.img`
  position: absolute;
  right: 0px;
  top: 400px;
  z-index: 1;
`;

export const SquareImg2 = styled.img`
  position: absolute;
  left: 0;
  bottom: -300px;
  z-index: 1;
`;

export const GradientImgFloor = styled.img`
  position: absolute;
  left: 0;
  bottom: -70px;
  z-index: -1;
  width: 900px;
`;

export const Ilustracao = styled.img`
  height: 565px;
`;

export const TextInputStyled = styled(Input).attrs({
  type: 'text',
})``;

export const DateInputStyled = styled(Input).attrs({
  type: 'date',
})``;
export const SelectInputStyled = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  height: 30px;
  color: #285430;
  font-family: 'Nunito Sans';
  height: 50px;

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
export const NumberInputStyled = styled(Input).attrs({
  type: 'number',
})``;

export const EmailInputStyled = styled(Input).attrs({
  type: 'email',
})``;

export const PasswordInputStyled = styled(Input).attrs({
  type: 'password',
})``;

export const ArrowButton = styled.button`
  background-color: #f5f7f9;
  color: #777777;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e1e4e8;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }
`;

export const LeftArrowIcon = styled.span`
  display: inline-block;
  margin-right: 5px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #777777;
`;

export const RightArrowIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #777777;
`;

export const SubmitButton = styled.button`
  background-color: #285430;
  border: 1px solid #285430;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: 'Nunito Sans';
  font-size: 18px;
  font-weight: 800;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 10px 30px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ccc;
  margin-bottom: 20px;
`;

export const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #285430;
  transition: width 0.5s ease-in-out; 
`;

