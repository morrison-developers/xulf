import styled from 'styled-components';

const StyledRichText = styled.div<{ customStyles?: string }>`
  line-height: 1.6;
  font-size: 1rem;
  color: inherit;

  ${({ customStyles }) => customStyles || ''}
`;

interface RichTextProps {
  /** Raw HTML string from CMS or dev */
  contentMarkup: string;
  /** Optional CSS for the wrapper */
  customStyles?: string;
  /** Optional ARIA label for accessibility */
  ariaLabel?: string;
}

export function RichText({ contentMarkup, customStyles, ariaLabel }: RichTextProps) {
  return (
    <StyledRichText
      aria-label={ariaLabel}
      customStyles={customStyles}
      dangerouslySetInnerHTML={{ __html: contentMarkup }}
    />
  );
}

export default RichText;
