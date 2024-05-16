import styled from 'styled-components';

export const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  width: 100px;
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

export const TextInputStyled = styled(Input).attrs({
  type: 'text',
})``;
