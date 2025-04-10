import styled from 'styled-components';

interface ImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional raw CSS to style the image */
  customStyles?: string;
}

const StyledImage = styled.img<
  React.ImgHTMLAttributes<HTMLImageElement> & { customStyles?: string }
>`
  max-width: 100%;
  object-fit: contain;
  object-position: center;

  ${({ customStyles }) => customStyles || ''}
`;

export function Image({ src, alt, customStyles }: ImageProps) {
  return <StyledImage src={src} alt={alt} customStyles={customStyles} />;
}

export default Image;
