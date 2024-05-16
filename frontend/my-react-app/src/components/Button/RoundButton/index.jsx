import React from 'react';
import { StyledRoundButton } from './roundButton.styles';

export const RoundButton = ({ label }) => {
  return <StyledRoundButton type="submit">{label}</StyledRoundButton>;
};
