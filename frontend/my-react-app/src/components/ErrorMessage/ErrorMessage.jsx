import React from 'react';
import { ContainerError } from './errorMessage.styles';

const ErrorComponente = ({ children }) => {
  return <ContainerError>{children}</ContainerError>;
};

export default ErrorComponente;