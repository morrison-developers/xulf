// libs/ui/src/components/Button/Button.tsx
'use client';

import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ href, onClick, children }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={styles.a}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}