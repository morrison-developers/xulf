'use client';
import { ReactNode } from 'react';
import styles from './Body.module.css'; // optional

export default function Body({ children }: { children: ReactNode }) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}
