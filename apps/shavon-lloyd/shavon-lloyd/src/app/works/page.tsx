// app/works/page.tsx
'use client';

import Script from 'next/script';
import styles from './Works.module.css';

import { Carousel } from '@xulf/ui';
import { Work, HeroImage, VideoCard } from '@xulf/ui/shavon-lloyd';

const WORKS: Work[] = [
  {
    id: '1',
    title: 'Alleluia',
    role: 'Composer',
    ensemble: 'Queens College Choir',
    details: 'Live performance • Cathedral setting',
    year: 2024,
    youtubeId: 'WwRjPP-ANzs', // replace with real IDs
    category: 'Choral',
  },
  {
    id: '2',
    title: 'Sanctus',
    role: 'Composer',
    ensemble: 'Chamber Choir',
    details: 'Premiere • Church of St. Something',
    year: 2023,
    youtubeId: 'FRGF77fBAeM',
    category: 'Choral',
  },
  {
    id: '3',
    title: 'Elegy for Strings',
    role: 'Composer',
    ensemble: 'Graduate String Ensemble',
    details: 'Concert Hall • Movements I–III',
    year: 2022,
    youtubeId: 'HyNyTspJta4',
    category: 'Instrumental',
  },
];



export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Works', item: 'https://shavonlloyd.com/works' },
    ],
  };

  const choral = WORKS.filter(w => w.category === 'Choral');
  const instrumental = WORKS.filter(w => w.category === 'Instrumental');

  return (
    <>
      <main className={styles.main}>
        {/* Hero */}
        <HeroImage
          src="/works-hero.jpg" // swap to your actual hero image
          alt="Performance stage"
          wrapperClassName={styles.heroWrap}
          imgClassName={styles.heroImg}
        />

        {/* Page Title */}
        <section className={styles.section}>
          <h2 className={'h2'}>Works</h2>
          <p className={'p'}>
            Selected choral and instrumental works with live performance excerpts and brief notes.
          </p>
        </section>

        {/* Choral Section */}
        <section className={styles.section}>
          <h3 className={'h3'}>Choral</h3>
          <div className={styles.carousel}>
            {/* simple scrollable row to mimic carousel UI */}
            <div className={styles.carouselTrack}>
              {choral.map(w => (
                <VideoCard key={w.id} w={w} />
              ))}
            </div>
            <div className={styles.carouselHint}>
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </section>

        {/* Instrumental Section */}
        <section className={styles.section}>
          <h3 className={styles.h3}>Instrumental</h3>
          <div className={styles.carousel}>
            <div className={styles.carouselTrack}>
              {instrumental.map(w => (
                <VideoCard key={w.id} w={w} />
              ))}
            </div>
            <div className={styles.carouselHint}>
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </section>

        {/* Full-width gallery image (footer banner) */}
        <div className={styles.bannerWrap}>
          <img src="/works-banner.jpg" alt="Choir performance" className={styles.bannerImg} />
        </div>
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
