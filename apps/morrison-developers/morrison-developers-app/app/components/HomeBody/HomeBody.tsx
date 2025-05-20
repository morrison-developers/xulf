'use client';

import React, { forwardRef } from 'react';
import './HomeBody.css';

interface Section {
  id: string;
  label: string;
  component: React.ElementType;
}

interface HomeBodyProps {
  sections: Section[];
}

const HomeBody = forwardRef<HTMLDivElement, HomeBodyProps>(({ sections }, ref) => {
  return (
    <div className="homebody-container" ref={ref}>
      <div className="homebody-inner">
        {sections.map(({ id, component: Component }) => (
          <section id={id} className="homebody-section" key={id}>
            <Component />
          </section>
        ))}
      </div>
    </div>
  );
});

HomeBody.displayName = 'HomeBody';

export default HomeBody;