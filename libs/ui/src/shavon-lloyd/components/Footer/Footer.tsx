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
      { value: 'do', label: 'Dothraki' },
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
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#D7E2EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg className={styles.youTube} xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none">
                <path d="M22.54 3.42C22.4212 2.94541 22.1792 2.51057 21.8386 2.15941C21.498 1.80824 21.0707 1.55318 20.6 1.42C18.88 1 12 1 12 1C12 1 5.11996 1 3.39996 1.46C2.92921 1.59318 2.50194 1.84824 2.16131 2.19941C1.82068 2.55057 1.57875 2.98541 1.45996 3.46C1.14518 5.20556 0.991197 6.97631 0.999961 8.75C0.988741 10.537 1.14273 12.3213 1.45996 14.08C1.59092 14.5398 1.83827 14.9581 2.17811 15.2945C2.51794 15.6308 2.93878 15.8738 3.39996 16C5.11996 16.46 12 16.46 12 16.46C12 16.46 18.88 16.46 20.6 16C21.0707 15.8668 21.498 15.6118 21.8386 15.2606C22.1792 14.9094 22.4212 14.4746 22.54 14C22.8523 12.2676 23.0063 10.5103 23 8.75C23.0112 6.96295 22.8572 5.1787 22.54 3.42Z" stroke="#D7E2EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.74996 12.02L15.5 8.75L9.74996 5.48V12.02Z" stroke="#D7E2EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M23 3.00029C22.0424 3.67577 20.9821 4.1924 19.86 4.53029C19.2577 3.8378 18.4573 3.34698 17.567 3.12422C16.6767 2.90145 15.7395 2.95749 14.8821 3.28474C14.0247 3.612 13.2884 4.19469 12.773 4.95401C12.2575 5.71332 11.9877 6.61263 12 7.53029V8.53029C10.2426 8.57586 8.50127 8.1861 6.93101 7.39574C5.36074 6.60537 4.01032 5.43893 3 4.00029C3 4.00029 -1 13.0003 8 17.0003C5.94053 18.3983 3.48716 19.0992 1 19.0003C10 24.0003 21 19.0003 21 7.50029C20.9991 7.22174 20.9723 6.94388 20.92 6.67029C21.9406 5.66378 22.6608 4.393 23 3.00029Z" stroke="#D7E2EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                <path d="M0 0H4.70852L5.74439 1.22421H2.44843L17.4215 21H15.7265L9.51121 12.713L1.78924 21H0L8.75784 11.583L0 0Z" fill="#D7E2EB"/>
                <path d="M22.13 21L17.4215 21L16.3856 19.7758L19.6816 19.7758L4.70852 4.19901e-06L6.40358 4.3472e-06L12.6188 8.287L20.3408 5.56563e-06L22.13 5.72205e-06L13.3722 9.41704L22.13 21Z" fill="#D7E2EB"/>
              </svg> */}
            </a>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.selectRow}>
         
         
          <div className={styles.selectGroup}>
            <label htmlFor="footer-region">Country/region</label>
            <div className={styles.selectBox}>
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
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="footer-language">Language</label>
            <div className={styles.selectBox}>
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
        </div>

        <div className={styles.bottomRow}>
          {/* <p className={styles.legal}>
            ©{year}, Shavon Lloyd • <a href="#">Privacy policy</a> •{' '}
            <a href="#">Refund policy</a> • <a href="#">Terms of service</a> •{' '}
            <a href="#">Contact information</a>
          </p> */}
          <p className={styles.credit}>
            made by humans at{' '}
            <a href="https://morrisondevelopers.com">Morrison Developers</a>
          </p>
        </div>
      </footer>
    </>
  );
}
