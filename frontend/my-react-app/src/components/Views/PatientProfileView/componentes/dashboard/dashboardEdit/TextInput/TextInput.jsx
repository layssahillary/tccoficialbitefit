import React from 'react';
import { TextInputStyled } from './TextInput.styles';

export const TextInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <>
      <TextInputStyled
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
