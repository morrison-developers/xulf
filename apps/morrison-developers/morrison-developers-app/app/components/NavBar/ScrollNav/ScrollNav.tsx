'use client';

import React, { useEffect, useState, useRef } from 'react';
import './ScrollNav.css';

interface Section {
  id: string;
  label: string;
}

interface ScrollNavProps {
  sections: Section[];
}

export default function ScrollNav({ sections }: ScrollNavProps) {
  const scrollRatioRef = useRef(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const frameId = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const indicatorHeight = 2.5;
  const trackHeight = sections.length * 3.5;
  const maxIndicatorTravel = trackHeight - indicatorHeight;

  useEffect(() => {
    const scrollRoot = document.querySelector('.homebody-container') as HTMLElement | null;
    if (!scrollRoot) return;

    const handleScroll = () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(() => {
        const maxScroll = scrollRoot.scrollHeight - scrollRoot.clientHeight;
        const currentScroll = scrollRoot.scrollTop;
        const ratio = currentScroll / maxScroll;
        scrollRatioRef.current = ratio;

        const newTop = ratio * maxIndicatorTravel;
        if (indicatorRef.current) {
          indicatorRef.current.style.transform = `translateY(${newTop}rem)`;
        }
      });
    };

    scrollRoot.addEventListener('scroll', handleScroll);
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: scrollRoot,
        threshold: 0.6,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      scrollRoot.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [sections, maxIndicatorTravel]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const scrollRoot = document.querySelector('.homebody-container') as HTMLElement;
    if (!el || !scrollRoot) return;

    scrollRoot.scrollTo({
      top: el.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scrollnav-container">
      <div className="scrollnav-bar" style={{ height: `${trackHeight}rem` }}>
        <div
          ref={indicatorRef}
          className="scrollnav-indicator"
          style={{
            height: `${indicatorHeight}rem`,
            transform: `translateY(0rem)`, // Initial value
          }}
        />
      </div>
      <div className="scrollnav-items">
        {sections.map((section, i) => (
          <div
            key={section.id}
            className={`scrollnav-item ${i === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </div>
        ))}
      </div>
    </div>
  );
}
