// components/HeroImage/HeroImage.tsx
import React from 'react';

type HeroImageProps = {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
};

export default function HeroImage({
  src,
  alt,
  wrapperClassName,
  imgClassName,
}: HeroImageProps) {
  return (
    <div className={wrapperClassName}>
      <img src={src} alt={alt} className={imgClassName} />
    </div>
  );
}
