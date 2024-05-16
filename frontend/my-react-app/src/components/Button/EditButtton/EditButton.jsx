import React from 'react';
import { StyledEditButton,Escrever } from './EditButton.styles';
import  EscreverIcon  from '../../../imagens/icones/escrever.png'; // Importe o ícone aqui

export const EditButton = ({ label,onClick }) => {
  return (
    <StyledEditButton onClick={onClick}>
      {label} <Escrever src={EscreverIcon} /> {/* Adicione o ícone aqui */}
    </StyledEditButton>
  );
};
