// Input.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
  Label,
  PasswordInputStyled,
  EmailInputStyled,
  TextInputStyled,
  ContainerInput,
  RadioContainer,
  RadioInput,
  RadioCustom,
  RadioDot,
  RadioLabel,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  SelectStyled,
  IconWrapper,
  InputWrapper
} from './Input.styles';

export const EmailInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <ContainerInput>
      <Label htmlFor="email">{label}</Label>
      <EmailInputStyled
        type="email"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </ContainerInput>
  );
};

export const PasswordInput = ({ label, placeholder, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ContainerInput>
      <Label htmlFor={name}>{label}</Label>
      <InputWrapper>
        <PasswordInputStyled
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <IconWrapper onClick={toggleShowPassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </IconWrapper>
      </InputWrapper>
    </ContainerInput>
  );
};

export const TextInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <ContainerInput>
      <Label htmlFor="text">{label}</Label>
      <TextInputStyled
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </ContainerInput>
  );
};

export const DateInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <ContainerInput>
      <Label htmlFor="text">{label}</Label>
      <TextInputStyled
        type="date"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </ContainerInput>
  );
};

export const SelectInput = ({ label, placeholder, name, value, onChange, options }) => {
  return (
    <ContainerInput>
      <Label htmlFor="select">{label}</Label>
      <SelectStyled
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {/* <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))} */}
      </SelectStyled>
    </ContainerInput>
  );
};

export const Checkbox = ({ label }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export const RadioButton = ({ label, value, selectedValue, onChange }) => {
  return (
    <RadioContainer>
      <RadioInput
        type="radio"
        value={value}
        checked={selectedValue === value}
        onChange={onChange}
      />
      <RadioCustom checked={selectedValue === value} onClick={onChange}>
        <RadioDot checked={selectedValue === value} />
      </RadioCustom>
      <RadioLabel>{label}</RadioLabel>
    </RadioContainer>
  );
};
