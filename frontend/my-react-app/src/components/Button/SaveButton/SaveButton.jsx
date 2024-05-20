import React from 'react';
import { SaveButtonStyled } from './SaveButton.styles';

export const SaveButton = ({ handleSave }) => {
  return <SaveButtonStyled onClick={handleSave}>Salvar</SaveButtonStyled>;
};
