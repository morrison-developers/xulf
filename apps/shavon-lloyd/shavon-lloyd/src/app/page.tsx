// app/page.tsx  (Home)
'use client';
import Script from 'next/script';
import styles from './page.module.css';
import { BioPreview, Calendar, Carousel, ContactForm, LandingHero, VideoCard } from '@xulf/ui';
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
      <LandingHero
        background="/hero-bg.jpg"
        logo="/logo.png"
        name="ShavonLloyd"
        tagline="Baritone | Music Educator | Composer | Conductor"
        socials={{
          instagram: "https://instagram.com/...",
          youtube: "https://youtube.com/...",
          twitter: "https://twitter.com/..."
        }}
      />
      <main className={styles.landing}>

        <BioPreview data={bioPreviewData} />

        <section className={styles.worksSection}>
          <h2 className="h2">Calendar</h2>
          <Carousel className={styles.carousel} options={{ loop: true }}>
            {CHORAL_WORKS.map(w => (
              <VideoCard key={w.id} w={w} />
            ))}
          </Carousel>
        </section>

        <section className={styles.calendar}>
          <h2 className="h2">Calendar</h2>
          <div className={styles.card}>
            <div className={styles.myCalendarWrap}>
              <Calendar events={EVENTS} />
            </div>
          </div>
        </section>

        <section className={styles.worksSection}>
          <Carousel className={styles.carousel} options={{ loop: true }}>
            {INSTRUMENTAL_WORKS.map(w => (
              <VideoCard key={w.id} w={w} />
            ))}
          </Carousel>
        </section>

        <div className={styles.contactSection}>
          <section className={styles.leftCol}>
            <h2 className='h2'>Contact Me</h2>
            <p className='p'>
              Whether you're planning a performance, commissioning new music, or simply want to connect,
              I’d love to hear from you. I respond personally to all inquiries.
            </p>
            <p className='mono'>Email: shavonlloydmusic@gmail.com</p>
          </section>

          <section className={styles.rightCol}>
            <ContactForm
              action="https://usebasin.com/f/57a74747dbca" // replace with your Basin form endpoint
              className={styles.contactForm}
              fieldClassName={{
                row: styles.formRow,
                label: styles.formLabel,
                input: styles.formInput,
                textarea: styles.formTextarea,
                button: styles.formButton,
                status: styles.formStatus,
              }}
              labels={{
                name: "Name",
                email: "Email",
                message: "Message",
                submit: "SEND",
              }}
            />
          </section>
        </div>

      </main>
      <Script id="ld-home" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
