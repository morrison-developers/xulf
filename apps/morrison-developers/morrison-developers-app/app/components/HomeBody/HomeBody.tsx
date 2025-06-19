'use client';

import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

import './HomeBody.css';

export interface Section {
  id: string;
  label: string;
  component: React.ComponentType;
  description?: string;
}

interface HomeBodyProps {
  sections: Section[];
}

export const HomeBody = forwardRef<HTMLDivElement, HomeBodyProps>(({ sections }, ref) => {
  return (
    <div className="homebody-container" ref={ref}>
      {sections.map(({ id, label, description, component }) => {
        const Component = dynamic(() => Promise.resolve(component), { ssr: false });

        return (
          <section id={id} className="homebody-section" key={id}>
            <div className="homebody-text">
              <h1 className="title-text">{label}</h1>
              {description && <p className="subtitle-text">{description}</p>}
            </div>
            <Component />
          </section>
        );
      })}
    </div>
  );
});

HomeBody.displayName = 'HomeBody';