// src/app/components/MusicTab/MusicTab.tsx
'use client';

import { useEffect } from 'react';
import { usePanel } from '../../(shared)/panel/PanelController';
import styles from './MusicTab.module.css';

type Props = { playlistId: string; title?: string };

export default function MusicTab({ playlistId, title = 'Music playlist' }: Props) {
  const { open, toggle, close } = usePanel();
  const isOpen = open === 'music';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-controls="music-panel"
        className={`${styles.tab} ${isOpen ? styles.tabOpen : ''}`}
        onClick={() => toggle('music')}
        title="Open Music"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M14.9999 0.000175784C6.71578 0.000175784 0 6.7159 0 15.0001C0 23.2845 6.71578 30 14.9999 30C23.2849 30 30 23.2847 30 15.0001C30 6.71637 23.2849 0.000878922 14.9996 0.000878922L14.9999 0V0.000175784ZM21.8788 21.6345C21.6101 22.0751 21.0335 22.2151 20.5927 21.9444C17.071 19.7931 12.6374 19.306 7.41604 20.499C6.91289 20.6135 6.41139 20.2983 6.29666 19.795C6.18141 19.2916 6.49553 18.7901 6.99996 18.6756C12.7139 17.3701 17.615 17.9321 21.569 20.3484C22.0097 20.6189 22.1495 21.1938 21.8788 21.6346L21.8788 21.6345ZM23.7148 17.5503C23.3762 18.1005 22.6562 18.2741 22.1063 17.9357C18.0743 15.4573 11.9284 14.7395 7.15928 16.1875C6.54076 16.3742 5.88756 16.0257 5.69994 15.4083C5.51361 14.7897 5.86236 14.1379 6.47977 13.9498C11.9273 12.2969 18.6996 13.0975 23.3298 15.9429C23.8797 16.2815 24.0534 17.0015 23.7151 17.5508V17.5505L23.7148 17.5503ZM23.8726 13.2973C19.0379 10.4258 11.0619 10.1619 6.44625 11.5627C5.7051 11.7875 4.92123 11.3692 4.69664 10.6278C4.47211 9.88623 4.89018 9.10299 5.6318 8.87775C10.9303 7.26921 19.7384 7.57994 25.3045 10.8843C25.9725 11.2801 26.1912 12.141 25.7952 12.8068C25.401 13.4735 24.5377 13.6933 23.8732 13.2973H23.8726Z" fill="white"/>
        </svg>
      </button>

      <div
        id="music-panel"
        role="dialog"
        aria-label={title}
        className={`${styles.embedWrap} ${isOpen ? styles.embedOpen : ''}`}
      >
        <iframe
          title={title}
          data-testid="embed-iframe"
          src={playlistId}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          height="100%"
        />
      </div>
    </>
  );
}
