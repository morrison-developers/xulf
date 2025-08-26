// src/app/components/Footer/Footer.tsx
'use client';

import { useMemo } from 'react';
import { useSettings } from '../../(shared)/settings/SettingsContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { lang, setLang, region, setRegion } = useSettings();

  // Labels you can tweak later
  const regionOptions = useMemo(
    () => [
      { value: 'US', label: 'United States | USD $' },
      { value: 'GB', label: 'United Kingdom | GBP £' },
      { value: 'EU', label: 'European Union | EUR €' },
    ],
    []
  );

  const languageOptions = useMemo(
    () => [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
    ],
    []
  );

  const year = new Date().getFullYear();

  return (
    <>
      <div className={styles.footerImgWrapper}>
        <img src={'/footer-placeholder.jpg'} alt={'footer-placeholder'} className={styles.footerImg} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.follow}>
          <h2 className={styles.followTitle}>Follow Me</h2>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="Twitter / X">X</a>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.selectRow}>
          <div className={styles.selectGroup}>
            <label htmlFor="footer-region">Country/region</label>
            <select
              id="footer-region"
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value as any)}
            >
              {regionOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="footer-language">Language</label>
            <select
              id="footer-language"
              name="language"
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
            >
              {languageOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.legal}>
            ©{year}, Shavon Lloyd • <a href="#">Privacy policy</a> •{' '}
            <a href="#">Refund policy</a> • <a href="#">Terms of service</a> •{' '}
            <a href="#">Contact information</a>
          </p>
          <p className={styles.credit}>
            made by humans at{' '}
            <a href="https://morrisondevelopers.com">Morrison Developers</a>
          </p>
        </div>
      </footer>
    </>
  );
}
