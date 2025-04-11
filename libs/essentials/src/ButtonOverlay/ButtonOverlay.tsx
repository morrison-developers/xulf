import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { globalEventBus } from '@xulf/utils'

const StyledButton = styled.button<
  { customStyles?: string } & ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: #0e0e0e;
  color: #efefef;
  border-radius: 0.5rem;
  padding: 0;
  border: none;
  cursor: pointer;
  width: clamp(12em, 12em, 25%);
  height: clamp(4em, 4em, 8em);

  transition: opacity ease 0.3s;
  &:hover {
    opacity: 0.77;
  }

  ${({ customStyles }) => customStyles || ''}
`;

interface ButtonOverlayProps {
  /** If provided, the button acts as a link to this URL */
  linkUrl?: string;
  /** Whether the link should open in a new tab */
  openInNewTab?: boolean;
  /** Optional ID of a modal to open via event */
  modalTargetId?: string;
  /** Optional custom onClick handler */
  onClick?: () => void;
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
  modalTargetId,
  onClick,
  customStyles,
  ariaLabel,
  children,
}: ButtonOverlayProps) {
  const handleClick = () => {
    if (modalTargetId) {
      globalEventBus.emit(`${modalTargetId}:open`);
    }
    if (onClick) onClick();
  };

  const button = (
    <StyledButton
      aria-label={ariaLabel || 'CTA Button'}
      customStyles={customStyles}
      onClick={handleClick}
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

export const editableProps = [
  { label: 'linkUrl', type: 'text' },
  { label: 'openInNewTab', type: 'boolean' },
  { label: 'modalTargetId', type: 'text' },
  { label: 'ariaLabel', type: 'text' },
  { label: 'customStyles', type: 'text' },
  { label: 'children', type: 'text' },
];
