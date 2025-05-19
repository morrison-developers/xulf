'use client';

import styled from 'styled-components';
import React from 'react';

interface UnderConstructionProps {
  heading?: string;
  message?: string;
  buttonText?: string;
  contactEmail?: string;
  buttonColor?: string;
}

interface StyledButtonProps {
  $buttonColor: string;
}

const RawStyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$buttonColor', '$buttonHoverColor'].includes(prop),
})<StyledButtonProps>`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ $buttonColor }) => $buttonColor};
  border: none;
  border-radius: 0.25rem;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

// Explicitly wrap to restore full prop inference
const StyledButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & StyledButtonProps
> = (props) => <RawStyledButton {...props} />;

export function UnderConstruction({
  heading = '🚧 This Page is Under Construction 🚧',
  message = `We're working hard to bring this page to life. In the meantime, if you
    have any questions or need to get in touch, feel free to contact me!`,
  buttonText = 'Contact Me',
  contactEmail = 'andy@morrisondevelopers.com',
  buttonColor = '#007bff',
}: UnderConstructionProps) {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Subheading>{message}</Subheading>
      <StyledButton
        onClick={() => (window.location.href = `mailto:${contactEmail}`)}
        $buttonColor={buttonColor}
      >
        {buttonText}
      </StyledButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: transparent;
  padding: 1rem;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
`;
