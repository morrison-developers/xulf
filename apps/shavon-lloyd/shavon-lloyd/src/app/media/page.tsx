// app/media/page.tsx
'use client';
import Script from 'next/script';
import styles from './Media.module.css';
import { Gallery, HeroImage } from '@xulf/ui';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Media', item: 'https://shavonlloyd.com/media' },
    ],
  };

  return (
    <>
      <main>
      <HeroImage
        src="/calendar-hero.jpg"
        alt="Performance still"
        wrapperClassName={styles.heroWrap}
        imgClassName={styles.heroImg}
      />
      <Gallery />
      </main>
      <Script id="ld-media" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
