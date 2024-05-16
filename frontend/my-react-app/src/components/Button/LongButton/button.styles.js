import styled from 'styled-components';

export const StyledButton = styled.button`
  all: unset;
  width: 100%;
  height: 52px;
  background-color: #5f8d4e;
  font-family: 'Mulish';
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    background-color: #416b32;
  }
`;
