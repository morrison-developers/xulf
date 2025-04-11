import type { ButtonHTMLAttributes } from 'react';
import { globalEventBus } from '@xulf/utils';
import clsx from 'clsx'; // optional, but nice for merging classes

interface ButtonOverlayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** If provided, the button acts as a link to this URL */
  linkUrl?: string;
  /** Whether the link should open in a new tab */
  openInNewTab?: boolean;
  /** Optional ID of a modal to open via event */
  modalTargetId?: string;
  /** Optional custom onClick handler */
  onClick?: () => void;
  /** Raw CSS classes injected into the button */
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
  customStyles = '',
  ariaLabel,
  children,
  ...rest
}: ButtonOverlayProps) {
  const handleClick = () => {
    if (modalTargetId) {
      globalEventBus.emit(`${modalTargetId}:open`);
    }
    if (onClick) onClick();
  };

  const button = (
    <button
      {...rest}
      onClick={handleClick}
      aria-label={ariaLabel || 'CTA Button'}
      role="button"
      className={clsx(
        'bg-neutral-900 text-neutral-100 rounded-lg border-none p-0 w-[12em] h-[4em] hover:opacity-80 transition-opacity',
        customStyles
      )}
    >
      {children || 'Click me'}
    </button>
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
