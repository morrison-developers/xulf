'use client';

import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

interface UnderConstructionProps {
  heading?: string;
  message?: string;
  buttonText?: string;
  contactEmail?: string;
}

export function UnderConstruction({
  heading = '🚧 This Page is Under Construction 🚧',
  message = `We're working hard to bring this page to life. In the meantime, if you
    have any questions or need to get in touch, feel free to contact me!`,
  buttonText = 'Contact Me',
  contactEmail = 'nicolettaberrysoprano@gmail.com',
}: UnderConstructionProps) {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <Subheading>{message}</Subheading>
      <Button onClick={() => (window.location.href = `mailto:${contactEmail}`)}>
        {buttonText}
      </Button>
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
  background-color: #f7f8fc;
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

const Button = styled.button<ButtonProps>`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
