// app/bio/page.tsx
'use client';

import content from './content/content.json';
import Script from 'next/script';
import styles from './Bio.module.css';

import { HeroImage } from '@xulf/ui/shavon-lloyd';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bio',  item: 'https://shavonlloyd.com/bio' },
    ],
  };

  return (
    <>
      <main className={styles.main}>
        <HeroImage
          src="/bio-hero.png"
          alt="shavon"
          wrapperClassName={styles.heroWrap}
          imgClassName={styles.heroImg}
        />
        <section className={styles.textBlock}>
          <h2 className={'h2'}>About Shavon</h2>
          {content.bio.split('\n\n').map((p, i) => (
            <p key={i} className={'p'}>{p}</p>
          ))}
        </section>

        <section className={styles.textBlock}>
          <h3 className={'h3'}>Condensed Biography</h3>
          {content.condensed.split('\n\n').map((p, i) => (
            <p key={i}  className={'p'}>{p}</p>
          ))}
        </section>
        <div className={styles.downloadWrap}>
          <h2 className={'h2'}>Download Full Resolution Headshot</h2>
          <button
            className={styles.button}
            onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          >
            DOWNLOAD
          </button>
        </div>

      </main>
      <Script id="ld-bio" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
