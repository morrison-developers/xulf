import React, { JSX } from 'react';
import styled from 'styled-components';

// Define the type for each link
interface Link {
  url: string;
  text: string;
  icon?: React.ReactNode; // Optional icon
}

// Props for the LinkTree component
interface LinkTreeProps {
  links: Link[];
}

// Styled container for the LinkTree
const StyledLinkTree = styled.div`
  padding: 1rem;
  background-color: #eeeeee;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
`;

// Styled individual link container
const StyledLink = styled('a')<React.AnchorHTMLAttributes<HTMLAnchorElement>>`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-decoration: none;
  color: var(--text);
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: bold;
  border-radius: 2px;
  background-color: var(--background-light);
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    scale: 0.99;
  }

  .icon {
    margin-right: 0.5rem;
    font-size: 1.5rem; /* Adjust icon size */
  }
`;

export function LinkTree({ links }: LinkTreeProps): JSX.Element {
  return (
    <StyledLinkTree>
      {links.map(({ url, text, icon }, index) => (
        <StyledLink key={index} href={url} target="_blank" rel="noopener noreferrer">
          {icon && <span className="icon">{icon}</span>}
          {text}
        </StyledLink>
      ))}
    </StyledLinkTree>
  );
}

export default LinkTree;
