// app/works/page.tsx
'use client';

import Script from 'next/script';
import styles from './Works.module.css';

import { Carousel } from '@xulf/ui';
import { Work, HeroImage, VideoCard } from '@xulf/ui/shavon-lloyd';
import { CHORAL_WORKS, INSTRUMENTAL_WORKS } from '../bio/content/works';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Works', item: 'https://shavonlloyd.com/works' },
    ],
  };

  return (
    <>
      <main className={styles.main}>
        <HeroImage
          src="/works-hero.jpg"
          alt="Performance stage"
          wrapperClassName={styles.heroWrap}
          imgClassName={styles.heroImg}
        />
        <section className={styles.titleSection}>
          <h2 className="h2">Compositions</h2>
        </section>

        {/* Choral Section */}
        <section className={styles.choralSection}>
          <div className={styles.choralNotes}>
            <h3 className="h3">Choral</h3>
            {/* plain text list above */}
            <ul className={styles.workList}>
              {CHORAL_WORKS.map(w => (
                <li key={w.id} className={'li'}>
                  {w.title} <em>{w.ensemble}</em> ({w.year})
                </li>
              ))}
            </ul>
          </div>
          {/* carousel with details below */}
          <Carousel className={styles.carousel} options={{ loop: true }}>
            {CHORAL_WORKS.map(w => (
              <VideoCard key={w.id} w={w} />
            ))}
          </Carousel>
        </section>

        {/* Instrumental Section */}
        <section className={styles.instrumentalSection}>
          <div className={styles.instrumentalNotes}>
            <h3 className="h3">Instrumental</h3>
            {/* plain text list above */}
            <ul className={styles.workList}>
              {INSTRUMENTAL_WORKS.map(w => (
                <li key={w.id} className={'li'}>
                  {w.title} <em>{w.ensemble}</em> ({w.year})
                </li>
              ))}
            </ul>
          </div>
          {/* carousel with details below */}
          <Carousel className={styles.carousel} options={{ loop: true }}>
            {INSTRUMENTAL_WORKS.map(w => (
              <VideoCard key={w.id} w={w} />
            ))}
          </Carousel>
        </section>
      </main>

      <Script
        id="ld-works"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
