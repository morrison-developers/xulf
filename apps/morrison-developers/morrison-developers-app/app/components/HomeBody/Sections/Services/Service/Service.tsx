'use client';

import React from 'react';
import './service.css';

interface ServiceProps {
  label: string;
  description?: string;
}

export default function Service({ label, description }: ServiceProps) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <img src="/icon_transparent.svg" alt="icon" />
      </div>
      <div className="service-text">
        <h3 className="service-title">{label}</h3>
        {description && <p className="service-description">{description}</p>}
      </div>
    </div>
  );
}
