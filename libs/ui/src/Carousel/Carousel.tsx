// src/app/components/Carousel/Carousel.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import styles from './Carousel.module.css';

type CarouselProps = {
  children: React.ReactNode;           // pass <VideoCard /> items as children
  options?: EmblaOptionsType;          // optional, e.g. { loop: true }
  className?: string;
  showDots?: boolean;
};

export function Carousel({
  children,
  options = { loop: true, align: 'start' },
  className,
  showDots = true,
}: CarouselProps) {
  const [emblaRef, embla] = useEmblaCarousel({
    ...options,
    watchDrag: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    onSelect();
  }, [embla, onSelect]);

  const scrollTo = useCallback(
    (idx: number) => embla && embla.scrollTo(idx),
    [embla]
  );
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <div className={`${styles.root} ${className ?? ''}`}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {React.Children.toArray(children).map((child, i) => (
            <div className={styles.slide} key={`slide-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <button className={styles.prev} onClick={scrollPrev} aria-label="Previous">‹</button>
      <button className={styles.next} onClick={scrollNext} aria-label="Next">›</button>

      {showDots && (
        <div className={styles.dots}>
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
