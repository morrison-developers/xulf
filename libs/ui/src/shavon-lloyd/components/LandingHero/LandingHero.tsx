// libs/ui/src/shavon-lloyd/components/Hero/LandingHero.tsx
'use client';

import Link from 'next/link';
import styles from './LandingHero.module.css';
import { MagicText } from '../..';

interface LandingHeroProps {
  className?: string;
  background: string;
  logo: string;
  name: string;
  tagline: string;
  socials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    spotify?: string;
  };
}

export default function LandingHero({ className, background, logo, name, tagline, socials }: LandingHeroProps) {
  return (
    <div className={styles.landingHeroWrapper}>

      <section className={styles.landingHero}>
        <div className={styles.overlayOne}></div>
        <div className={styles.overlayTwo}></div>
        <img
          src={background}
          alt={`${name} background`}
          className={styles.bg}
        />

        <div className={styles.content}>

          <div className={styles.brand}>
            <img src={logo} alt={`${name} logo`} className={styles.logo} />
            <img src={'/title-text.svg'} alt={`${name} title-text`} className={styles.titleText} />
            <MagicText
              interval={2500}
              content={[
                { text: "Baritone" },
                { text: "Music Educator" },
                { text: "Composer" },
                { text: "Conductor" }
              ]}
            />
          </div>

          {/* <div className={styles.socials}>
            {socials.instagram && (
              <Link href={socials.instagram} target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </Link>
            )}
            {socials.youtube && (
              <Link href={socials.youtube} target="_blank" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </Link>
            )}
            {socials.twitter && (
              <Link href={socials.twitter} target="_blank" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            )}
            {socials.spotify && (
              <Link href={socials.spotify} target="_blank" aria-label="Spotify">
                <i className="fab fa-spotify"></i>
              </Link>
            )}
          </div> */}
        </div>
      </section>
    </div>
  );
}