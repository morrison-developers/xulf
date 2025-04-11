import styled from 'styled-components';

interface EmbedProps {
  /** HTML string to embed, such as iframe or other embed code */
  embedContent: string;
  /** Optionally restrict iframe communication */
  targetOrigin?: string;
  /** Whether to allow <script> tags in embedContent */
  allowScriptTags?: boolean;
  /** Optional CSS string to style wrapper */
  customStyles?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

const StyledEmbed = styled.div<
  React.HTMLAttributes<HTMLDivElement> & { customStyles?: string }
>`
  width: 100%;
  overflow: hidden;

  ${({ customStyles }) => customStyles || ''}
`;

export function Embed({
  embedContent,
  targetOrigin,
  allowScriptTags = false,
  customStyles,
  ariaLabel,
}: EmbedProps) {
  // If scripts are not allowed, strip them out
  const sanitizedContent = allowScriptTags
    ? embedContent
    : embedContent.replace(/<script.*?>.*?<\/script>/gi, '');

  return (
    <StyledEmbed
      role="region"
      aria-label={ariaLabel}
      customStyles={customStyles}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

export default Embed;

export const editableProps = [
  { label: 'embedContent', type: 'text' },
  { label: 'targetOrigin', type: 'text' },
  { label: 'allowScriptTags', type: 'boolean' },
  { label: 'customStyles', type: 'text' },
  { label: 'ariaLabel', type: 'text' },
];
