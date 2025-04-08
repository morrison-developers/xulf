import styled from 'styled-components';

const StyledButton = styled.button<{ customStyles?: string }>`
  background: #0e0e0e;
  border-radius: 0.5rem;
  padding: 0;
  border: none;
  cursor: pointer;
  width: clamp(12em, 12em, 25%);
  height: clamp(4em, 4em, 8em);

  transition: opacity ease 0.3s;
  &:hover {
    opacity: 0.77
  }

  ${props => props.customStyles || ''}
`;
interface ButtonOverlayProps {
  /** If provided, the button acts as a link to this URL */
  linkUrl?: string;
  /** Whether the link should open in a new tab */
  openInNewTab?: boolean;
  /** Raw CSS injected into the button */
  customStyles?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Optional button content */
  children?: React.ReactNode;
}

export function ButtonOverlay({
  linkUrl,
  openInNewTab = false,
  customStyles,
  ariaLabel,
  children,
}: ButtonOverlayProps) {
  const button = (
    <StyledButton
      aria-label={ariaLabel || 'CTA Button'}
      customStyles={customStyles}
      role="button"
    >
      {children || 'Click me'}
    </StyledButton>
  );

  if (linkUrl) {
    return (
      <a
        href={linkUrl}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {button}
      </a>
    );
  }

  return button;
}

export default ButtonOverlay;
