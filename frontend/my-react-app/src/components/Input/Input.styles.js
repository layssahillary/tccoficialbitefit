
import styled from 'styled-components';

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: fit-content;
`;

export const Label = styled.label`
  font-family: 'Nunito Sans';
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
  color: #828282;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%; 
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  width: 420px;
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

export const PasswordInputStyled = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;


export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #828282;
  z-index: 1;
`;

export const EmailInputStyled = styled(Input).attrs({
  type: 'email',
})``;

export const TextInputStyled = styled(Input).attrs({
  type: 'text',
})``;


export const SelectStyled = styled(Input).attrs({
  type: 'select',
})``;

export const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  justify-content: center;
  color: #828282;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

export const RadioCustom = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ checked }) => (checked ? '#5F8D4E' : '#E8E8E8')};
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#5F8D4E' : 'transparent')};
  opacity: ${({ checked }) => (checked ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;
`;

export const RadioLabel = styled.span`
  font-size: 16px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxTitle = styled.span``;

export const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  margin-right: 8px;

  &:checked {
    background-color: #5f8d4e; 
  }
`;

export const CheckboxLabel = styled.span``;
