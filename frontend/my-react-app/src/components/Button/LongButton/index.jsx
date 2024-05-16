import React from 'react';
import { StyledButton } from './button.styles';

export const Button = ({ label }) => {
  return <StyledButton type="submit">{label}</StyledButton>;
};
