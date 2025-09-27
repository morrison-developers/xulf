// app/bio/page.tsx
'use client';

import content from '../content/bio-content.json';
import Script from 'next/script';
import styles from './Bio.module.css';

import { Button, HeroImage } from '@xulf/ui/shavon-lloyd';

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
          src="/bio-hero.webp"
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
          <h3 className={'h3'}>Compositions</h3>
          {content.compositions.split('\n\n').map((p, i) => (
            <p key={i}  className={'p'}>{p}</p>
          ))}
        </section>

        <section className={styles.textBlock}>
          <h3 className={'h3'}>Press Quotes</h3>
          {content.pressQuotes.map((quote, i) => (
            <p key={i} className={'p'}>{quote}</p>
          ))}
        </section>

        <div className={styles.downloadWrap}>
          <h2 className="h2">Download Full Resolution Headshot</h2>
          <Button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/headshot.jpeg';
              link.download = 'shavon-lloyd-headshot.jpeg';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            DOWNLOAD
          </Button>
        </div>

      </main>
      <Script id="ld-bio" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
