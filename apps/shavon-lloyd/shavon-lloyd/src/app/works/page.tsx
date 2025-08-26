// app/works/page.tsx
'use client';

import Script from 'next/script';
import styles from './Works.module.css';

import { Carousel } from '@xulf/ui';
import { Work, HeroImage, VideoCard } from '@xulf/ui/shavon-lloyd';

const CHORAL_WORKS: Work[] = [
  {
    id: '1',
    title: 'Goodbye, My Friend (Peace and Love)',
    role: 'Composer',
    ensemble: 'SATB choir and piano',
    details: '2021',
    year: 2021,
    youtubeId: '',
    category: 'Choral',
  },
  {
    id: '2',
    title: "8'46\": In Reflection of the Murder of George Floyd",
    role: 'Composer',
    ensemble: 'SATB choir a cappella',
    details: '2020',
    year: 2020,
    youtubeId: '',
    category: 'Choral',
  },
  {
    id: '3',
    title: 'Alleluia',
    role: 'Composer',
    ensemble: 'SATB double choir a cappella',
    details: '2019',
    year: 2019,
    youtubeId: 'WwRjPP-ANzs',
    category: 'Choral',
  },
  {
    id: '4',
    title: 'Motherless Child',
    role: 'Composer',
    ensemble: 'SATB choir, piano, and tenor saxophone',
    details: '2018',
    year: 2018,
    youtubeId: '',
    category: 'Choral',
  },
  {
    id: '5',
    title: 'So Breaks the Sun',
    role: 'Composer',
    ensemble: 'SATB choir a cappella',
    details: '2017',
    year: 2017,
    youtubeId: '',
    category: 'Choral',
  },
];

const INSTRUMENTAL_WORKS: Work[] = [
  {
    id: '1',
    title: 'Solo for Contrabassoon',
    role: 'Composer',
    ensemble: 'Contrabassoon solo',
    details: '2018',
    year: 2018,
    youtubeId: '',
    category: 'Instrumental',
  },
  {
    id: '2',
    title: 'Tambora',
    role: 'Composer',
    ensemble: 'Brass quintet',
    details: '2018',
    year: 2018,
    youtubeId: '',
    category: 'Instrumental',
  },
  {
    id: '3',
    title: 'Continuum',
    role: 'Composer',
    ensemble: 'Alto saxophone and clarinet',
    details: '2017',
    year: 2017,
    youtubeId: '',
    category: 'Instrumental',
  },
  {
    id: '4',
    title: 'Bedlam',
    role: 'Composer',
    ensemble: 'Clarinet, alto saxophone, and bassoon',
    details: '2016',
    year: 2016,
    youtubeId: '',
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
          <h2 className="h2">My Compositions</h2>
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
