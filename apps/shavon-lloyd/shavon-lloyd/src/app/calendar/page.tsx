// app/calendar/page.tsx
'use client';

import Script from 'next/script';
import styles from './Calendar.module.css';
import overrides from './CalendarOverrides.module.css';
import { HeroImage, Calendar } from '@xulf/ui/shavon-lloyd';

import { EVENTS } from './content.ts'

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Calendar', item: 'https://shavonlloyd.com/calendar' },
    ],
  };

  return (
    <>
      <HeroImage
        src="/calendar-hero.jpg"
        alt="Performance still"
        wrapperClassName={styles.heroWrap}
        imgClassName={styles.heroImg}
      />
      <main className={styles.main}>

        <section className={styles.section}>
          <h2 className="h2">Calendar</h2>
          <div className={styles.card}>
            {/* Your shared calendar component */}
            <div className={overrides.myCalendarWrap}>
              <Calendar events={EVENTS} />
            </div>
          </div>
        </section>
      </main>

      <Script
        id="ld-calendar"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
