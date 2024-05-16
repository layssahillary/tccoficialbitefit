import React from 'react';
import { StyledBackButton, Escrever } from './BackButton.styles';
import  BackIcon  from '../../../imagens/icones/back.png'; // Importe o ícone aqui

export const BackButton = ({ label,onClick }) => {
  return (
    <StyledBackButton onClick={onClick}>
      {label} <Escrever src={BackIcon} />
    </StyledBackButton>
  );
};
