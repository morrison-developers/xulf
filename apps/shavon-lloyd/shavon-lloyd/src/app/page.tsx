// app/page.tsx  (Home)
'use client';
import Script from 'next/script';
import styles from './page.module.css';
import overrides from './calendar/CalendarOverrides.module.css';
import { BioPreview, Calendar, Carousel, VideoCard } from '@xulf/ui';
import bioPreviewData from './bio/content/bio-preview.json';
import { CHORAL_WORKS, INSTRUMENTAL_WORKS } from './bio/content/works';
import { EVENTS } from './bio/content/calendar';

export default function Index() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
    ],
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.bioPreview}>
          <BioPreview data={bioPreviewData} />
        </section>

        <section className={styles.worksSection}>
          {/* carousel with details below */}
          <Carousel className={styles.carousel} options={{ loop: true }}>
            {CHORAL_WORKS.map(w => (
              <VideoCard key={w.id} w={w} />
            ))}
          </Carousel>
        </section>

        <section className={styles.calendar}>
          <h2 className="h2">Calendar</h2>
          <div className={styles.card}>
            <div className={overrides.myCalendarWrap}>
              <Calendar events={EVENTS} />
            </div>
          </div>
        </section>

      </main>
      <Script id="ld-home" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
