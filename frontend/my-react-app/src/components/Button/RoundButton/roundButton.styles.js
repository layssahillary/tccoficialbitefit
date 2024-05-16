import styled from 'styled-components';

export const StyledRoundButton = styled.a`
  all: unset;
  width: 230px;
  height: 55px;
  background-color: #5f8d4e;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 55px;
  cursor: pointer;
  font-family: 'Mulish';
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    background-color: #416b32;
  }
`;
