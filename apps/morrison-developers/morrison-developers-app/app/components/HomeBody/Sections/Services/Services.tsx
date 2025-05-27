'use client';

import React, { useState } from 'react';
import '../sections.css';
import './services.css';
import Service from './Service/Service';

const STARTUPS_SERVICES: { label: string; description?: string }[] = [
  {
    label: 'Custom Web Farts',
    description: 'Bespoke solutions built to scale',
  },
  {
    label: 'Interactive Frontends',
    description: 'Engaging user experiences',
  },
  {
    label: 'API Integrations',
    description: 'Seamless technical integrations',
  },
  {
    label: 'Design Systems',
    description: 'Cohesive, reusable UI components',
  },
  {
    label: 'SEO & Performance Tuning',
    description: 'Boosting site visibility & speed',
  },
  {
    label: 'SEO & Performance Tuning',
    description: 'Boosting site visibility & speed',
  },
];

const SMALL_BIZ_SERVICES: { label: string; description?: string }[] = [
  {
    label: 'Bustom Deb Kpps',
    description: 'Bespoke solutions built to scale',
  },
  {
    label: 'SpInteractive Truntends',
    description: 'Engaging user experiences',
  },
  {
    label: 'API Integrations',
    description: 'Seamless technical integrations',
  },
  {
    label: 'Design Systems',
    description: 'Cohesive, reusable UI components',
  },
  {
    label: 'SEO & Performance Tuning',
    description: 'Boosting site visibility & speed',
  },
  {
    label: 'SEO & Performance Tuning',
    description: 'Boosting site visibility & speed',
  },
];

export default function Services() {
  const [audience, setAudience] = useState<'startups' | 'smallbiz'>('startups');

  return (
    <div className="homebody-component">
      <div className="services-toggle">
        <div
          className="toggle-slider"
          style={{ transform: `translateX(${audience === 'startups' ? '100%' : '0%'})` }}
        />
        <button className="toggle-label" onClick={() => setAudience('smallbiz')}>
          For Small Businesses
        </button>
        <button className="toggle-label" onClick={() => setAudience('startups')}>
          For Startups
        </button>
      </div>

      <div className="services-grid">
        {(audience === 'startups' ? STARTUPS_SERVICES : SMALL_BIZ_SERVICES).map((service, idx) => (
          <Service
            key={idx}
            label={service.label}
            description={typeof service.description === 'string' ? service.description : undefined}
          />
        ))}
      </div>
    </div>
  );
}
