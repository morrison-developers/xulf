// libs/ui/src/components/BioPreview/BioPreview.tsx
'use client';

import Image from 'next/image';
import { Button } from '@xulf/ui';
import styles from './BioPreview.module.css';

interface BioPreviewProps {
  data: {
    heading: string;
    image: string;
    alt: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export default function BioPreview({ data }: BioPreviewProps) {
  return (
    <section className={styles.bioPreview}>
      <div className={styles.bioPreviewWrapper}>
        <div className={styles.content}>
          <div className={styles.imageWrap}>
            <Image
              src={data.image}
              alt={data.alt}
              width={400}
              height={500}
              className={styles.image}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.textBox}>
              <p className='p'>{data.text}</p>
            </div>
            <Button href={data.buttonHref}>{data.buttonLabel}</Button>
          </div>
        </div>
      </div>
      <img src="/top-staff.png" alt="top staff" className={styles.topStaff} />
      <img src="/btm-staff.png" alt="btm staff" className={styles.btmStaff} />
    </section>
  );
}