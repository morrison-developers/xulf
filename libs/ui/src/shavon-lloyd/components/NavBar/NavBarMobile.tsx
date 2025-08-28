"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './NavBarMobile.module.css';

export default function NavBarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      // if scrolled down and beyond small threshold, hide; if up, show
      if (dy > 4 && y > 24) setHidden(true);
      else if (dy < -4) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes or on scroll hide
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (hidden) setOpen(false); }, [hidden]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/bio', label: 'Bio' },
    { href: '/works', label: 'Works' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div className={`${styles.bar} ${hidden ? styles.hidden : ''}`}>
        {/* Left: Logo mark (simple circle mark to keep lightweight on mobile) */}
        <div className={styles.logo}>
          <div className={styles.logoCircle} />
          <span className={styles.title}>Shavon Lloyd</span>
        </div>

        {/* Right: Hamburger */}
        <button
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
          className={styles.hamburger}
        >
          <span aria-hidden="true" className={styles.hamburgerLine} />
          <span aria-hidden="true" className={styles.hamburgerLine} />
          <span aria-hidden="true" className={styles.hamburgerLine} />
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.menu} ${open ? styles.open : ''}`}>
        <nav>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={`${styles.link} ${pathname === href ? styles.active : ''}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Push content down so the fixed bar doesn’t overlap when at top */}
      <div style={{ height: 56 }} />
    </>
  );
}