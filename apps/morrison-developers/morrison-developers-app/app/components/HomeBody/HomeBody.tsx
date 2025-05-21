'use client';

import React, { forwardRef } from 'react';
import './HomeBody.css';

interface Section {
  id: string;
  label: string;
  description?: string;
  component: React.ElementType;
}

interface HomeBodyProps {
  sections: Section[];
}

const HomeBody = forwardRef<HTMLDivElement, HomeBodyProps>(({ sections }, ref) => {
  return (
    <div className="homebody-container" ref={ref}>
      {sections.map(({ id, label, description, component: Component }) => (
        <section id={id} className="homebody-section" key={id}>
          <div className="homebody-text">
            <h1 className="title-text">{label}</h1>
            {description && <p className="subtitle-text">{description}</p>}
          </div>
          <Component />
        </section>
      ))}
    </div>
  );
});

HomeBody.displayName = 'HomeBody';

export default HomeBody;