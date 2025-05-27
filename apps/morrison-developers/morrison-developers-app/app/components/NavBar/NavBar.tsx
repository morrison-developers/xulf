'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import './nav-bar.css';
import ScrollNav from './ScrollNav/ScrollNav';

function MobileNavBar() {
  return (
    <div className="mobile-nav">
        <Image
          src="/Logo_Transparent.svg"
          alt="Morrison Developers Logo"
          width={100}
          height={100}
          style={{ width: '100%', height: 'auto', padding: '1rem' }}
        />
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default function NavBar({ sections }: { sections: { id: string; label: string }[] }) {
  const isLargeScreen = useMediaQuery('(min-width: 64em)');

  if (!isLargeScreen) {
    return <MobileNavBar />;
  }

  return (
    <div className="nav-wrapper">
      <div className="shared-card header">
        <Image
          src="/Transparent_Horizontal.svg"
          alt="Morrison Developers Logo"
          width={296}
          height={128}
          style={{ width: '100%', height: 'auto', padding: '1rem' }}
        />
      </div>
      {sections.length > 1 &&
        <div className="shared-card nav-section">
          <ScrollNav sections={sections} />
        </div>
      }
      <div className="footer">
        <button className="button">Let's Talk</button>
        <h4>
          made by humans at <strong>Morrison Developers</strong>
        </h4>
      </div>
    </div>
  );
}