interface ImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional CSS classes to style the image */
  customStyles?: string;
}

export function Image({ src, alt, customStyles }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={customStyles}
      style={{
        maxWidth: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
      }}
    />
  );
}

export default Image;

export const editableProps = [
  { label: 'src', type: 'text' },
  { label: 'alt', type: 'text' },
  { label: 'customStyles', type: 'text' },
];
