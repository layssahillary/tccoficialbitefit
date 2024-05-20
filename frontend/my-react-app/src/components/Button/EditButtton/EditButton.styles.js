import styled from 'styled-components';

export const EditButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  text-decoration: none !important;

  .edit-svgIcon {
    width: 17px;
    transition-duration: 0.3s;
  }

  .edit-svgIcon path {
    fill: white;
  }

  &:hover {
    width: 120px;
    border-radius: 50px;
    background-color: rgb(255, 69, 69);
    align-items: center;

    .edit-svgIcon {
      width: 20px;
      transform: translateY(60%);
      transition-duration: 0.3s;
      transform: rotate(360deg);
    }
  }

  &::before {
    display: none;
    content: "Editar";
    color: white;
    transition-duration: 0.3s;
    font-size: 2px;
  }

  &:hover::before {
    display: block;
    padding-right: 10px;
    font-size: 13px;
    opacity: 1;
    transform: translateY(0px);
    transition-duration: 0.3s;
  }
`;

