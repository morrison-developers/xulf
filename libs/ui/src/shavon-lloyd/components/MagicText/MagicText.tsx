// libs/ui/src/components/MagicText/MagicText.tsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './MagicText.module.css';

interface MagicTextProps {
  content: { text: string }[]; // array of objects with { text }
  interval?: number;           // ms between rotations
}

export default function MagicText({ content, interval = 3000 }: MagicTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, interval);
    return () => clearInterval(id);
  }, [content.length, interval]);

  return (
    <div className={styles.magicText}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ minWidth: '4rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {content[index].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}