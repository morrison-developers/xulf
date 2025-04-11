interface EmbedProps {
  /** HTML string to embed, such as iframe or other embed code */
  embedContent: string;
  /** Optionally restrict iframe communication */
  targetOrigin?: string;
  /** Whether to allow <script> tags in embedContent */
  allowScriptTags?: boolean;
  /** Optional CSS classes to style wrapper */
  customStyles?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

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
    <div
      role="region"
      aria-label={ariaLabel}
      className={customStyles}
      style={{ width: '100%', overflow: 'hidden' }}
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
