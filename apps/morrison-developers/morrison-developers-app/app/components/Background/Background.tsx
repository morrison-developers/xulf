'use client';

import React from 'react';

export default function Background() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        background: 'var(--background-body)',
        pointerEvents: 'none',
      }}
    />
  );
}