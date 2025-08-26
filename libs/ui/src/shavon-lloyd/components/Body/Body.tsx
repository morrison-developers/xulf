'use client';
import { ReactNode } from 'react';
import styles from './Body.module.css'; // optional

export default function Body({ children }: { children: ReactNode }) {
  return (
    <div className={styles.body}>
      
      {/* <div className="eyeSaver">
        {Array.from({ length: 20 }).map((_, i) => (
        <h1 key={i} className="spacer">EYE SAVER</h1>
        ))}
      </div> */}

      {children}
    </div>
  );
}
