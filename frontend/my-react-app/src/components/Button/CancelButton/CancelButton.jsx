import React from 'react';
import { CancelButtonStyled } from './CancelButton.styles';

export const CancelButton = ({ handleCancel }) => {
  return <CancelButtonStyled onClick={handleCancel}>Cancelar</CancelButtonStyled>;
};
