import styled from 'styled-components';

export const StyledEditButton = styled.button`
  all: unset;
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
  box-sizing: border-box;
  font-family: 'Mulish';
  font-size: 18px;
  font-weight: 800px;
  color: #6c7176;
  cursor: pointer;
  display: inline-block;
  line-height: 29px;
  padding: 5px 10px 5px 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;
  display: inline-flex; /* Alteração aqui */
  min-width: auto; /* Alteração aqui */
  gap: 10px;

  &:hover {
    background-color: #f7fafa;
  }
  &:focus {
    border-color: #285430;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
  }
`;

export const Escrever = styled.img`
  width: 20px;
`;
