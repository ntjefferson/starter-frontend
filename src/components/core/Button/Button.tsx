import React from 'react';
import { StyledButton } from './Button.styles';

type ButtonProps = {
  children?: React.ReactNode,
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(e);
  };
  return (
    <StyledButton onClick={handleOnClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
