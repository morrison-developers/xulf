// Tabs.tsx
'use client';
import styles from './Tabs.module.css';
import React, { useRef } from "react";

type TabsProps = {
  children: React.ReactNode; // assume each child has the same height
  className?: string;
  style?: React.CSSProperties;
  gap?: number;
};

export default function Tabs({ children, className, style, gap }: TabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      {children}
    </div>
  );
}