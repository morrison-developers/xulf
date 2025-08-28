// app/contact/page.tsx

'use client';
import { HeroImage, ContactForm } from '@xulf/ui';
import Script from 'next/script';
import styles from './Contact.module.css';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://shavonlloyd.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://shavonlloyd.com/contact' },
    ],
  };

  return (
    <>
      <div className={styles.main} >
        <HeroImage
          src={'/contact-hero.jpg'}
          alt={'Contact Page Hero'}
        />
        <div className={styles.body}>
          <section className={styles.leftCol}>
            <h2 className='h2'>Contact Me</h2>
            <p className='p'>
              Whether you're planning a performance, commissioning new music, or simply want to connect,
              I’d love to hear from you. I respond personally to all inquiries.
            </p>
            <p className='p'>Email: shavonlloydmusic@gmail.com</p>
          </section>

          <section className={styles.rightCol}>
            <ContactForm
              action="https://usebasin.com/f/57a74747dbca" // replace with your Basin form endpoint
              className="contact-form"
              fieldClassName={{
                row: "form-row",
                label: "form-label",
                input: "form-input",
                textarea: "form-textarea",
                button: "form-button",
                status: "form-status",
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
      </div>
      <Script id="ld-contact" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
