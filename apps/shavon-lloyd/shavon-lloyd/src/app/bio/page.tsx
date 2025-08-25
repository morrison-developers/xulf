// app/bio/page.tsx
import content from './content/content.json';
import Script from 'next/script';
import styles from './Bio.module.css';
import Image from 'next/image';

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
        <div className={styles.heroWrap}>
          <img src="/hero.png" alt="shavon" className={styles.heroImg}/>
        </div>
        <section className={styles.textBlock}>
        <h2 className={styles.h2}>About Shavon</h2>
          {content.bio.split('\n\n').map((p, i) => (
            <p key={i} className={styles.p}>{p}</p>
          ))}
        </section>

        <section className={styles.textBlock}>
          <h3 className={styles.h3}>Condensed Biography</h3>
          {content.condensed.split('\n\n').map((p, i) => (
            <p key={i} className={styles.p}>{p}</p>
          ))}
        </section>
      </main>
      <Script id="ld-bio" type="application/ld+json" strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
