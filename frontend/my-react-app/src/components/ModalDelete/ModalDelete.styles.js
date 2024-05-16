import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com transparência */
  backdrop-filter: blur(5px); /* Efeito de desfoque */
  z-index: 999; /* Garante que o overlay fique atrás do modal */
`;

export const Card = styled.div`
  width: 300px;
  height: fit-content;
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.068);
  z-index: 1000;
`;

export const CardContent = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CardHeading = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: rgb(27, 27, 27);
`;

export const CardDescription = styled.p`
  font-weight: 100;
  color: rgb(102, 102, 102);
`;

export const CardButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const CardButton = styled.button`
  width: 50%;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
`;

export const PrimaryButton = styled(CardButton)`
  background-color: rgb(255, 114, 109);
  color: white;

  &:hover {
    background-color: rgb(255, 73, 66);
  }
`;

export const SecondaryButton = styled(CardButton)`
  background-color: #ddd;

  &:hover {
    background-color: rgb(197, 197, 197);
  }
`;

export const ExitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  &:hover svg {
    fill: black;
  }

  svg {
    fill: rgb(175, 175, 175);
  }
`;