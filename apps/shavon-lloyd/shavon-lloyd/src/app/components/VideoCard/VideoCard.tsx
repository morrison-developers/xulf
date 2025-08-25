import styles from './VideoCard.module.css'
import { Work } from '@shared/types';

export default function VideoCard({ w }: { w: Work }) {
  return (
    <article className={styles.card}>
      <div className={styles.videoWrap}>
        <iframe
          className={styles.iframe}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${w.youtubeId}`}
          title={`${w.title} — ${w.ensemble ?? ''}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{w.title}</h4>
        <p className={styles.cardMeta}>
          {w.role && <span>{w.role}</span>}
          {w.ensemble && <span> • {w.ensemble}</span>}
          {w.year && <span> • {w.year}</span>}
        </p>
        {w.details && <p className={styles.cardText}>{w.details}</p>}
      </div>
    </article>
  );
}