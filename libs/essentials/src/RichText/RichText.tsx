import type { HTMLAttributes } from 'react';

interface RichTextProps {
  /** Raw HTML string from CMS or dev */
  contentMarkup?: string;
  /** Optional CSS classes for the wrapper */
  customStyles?: string;
  /** Optional ARIA label for accessibility */
  ariaLabel?: string;
}

export function RichText({ contentMarkup, customStyles, ariaLabel }: RichTextProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={customStyles}
      style={{
        lineHeight: 1.6,
        fontSize: '1rem',
        color: 'inherit',
      }}
      dangerouslySetInnerHTML={{ __html: contentMarkup || '<h2>RichText Content</h2>' }}
    />
  );
}

export default RichText;

export const editableProps = [
  { label: 'contentMarkup', type: 'text' },
  { label: 'customStyles', type: 'text' },
  { label: 'ariaLabel', type: 'text' },
];
