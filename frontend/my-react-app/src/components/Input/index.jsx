// Input.js
import React from 'react';
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

export const PasswordInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <ContainerInput>
      <Label htmlFor="password">{label}</Label>
      <PasswordInputStyled
        type="password"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
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
