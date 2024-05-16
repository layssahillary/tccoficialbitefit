// ModalDelete.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeading,
  CardDescription,
  CardButtonWrapper,
  SecondaryButton,
  PrimaryButton,
  ExitButton,
  Overlay, // Importe o Overlay aqui
} from './ModalDelete.styles';

const CardComponent = ({
  heading,
  description,
  onCancel,
  onDelete,
  cancelText,
  deleteText,
  show,
}) => {
  return (
    <>
      {show && <Overlay />}
      <Card>
        <CardContent>
          <CardHeading>{heading}</CardHeading>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardButtonWrapper>
          <SecondaryButton onClick={onCancel}>{cancelText}</SecondaryButton>
          <PrimaryButton onClick={onDelete}>{deleteText}</PrimaryButton>
        </CardButtonWrapper>
        <ExitButton onClick={onCancel}>
  <svg height="20px" viewBox="0 0 384 512">
    <path
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
    ></path>
  </svg>
</ExitButton>
      </Card>
    </>
  );
};

export default CardComponent;
