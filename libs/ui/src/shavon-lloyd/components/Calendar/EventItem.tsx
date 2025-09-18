// libs/ui/src/shavon-lloyd/components/Calendar/EventItem.tsx
'use client';
import styles from './Calendar.module.css';
import type { CalEvent } from '@xulf/ui/shavon-lloyd';
import { formatLocalDate } from './dateUtils';

// Simple React-friendly inline icons (no external lib required)
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M10 14a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 1 0-7.07-7.07L10.7 6.23"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 10a5 5 0 0 0-7.07 0L5.5 11.41a5 5 0 1 0 7.07 7.07l.78-.78"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCopy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <rect x="4" y="4" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);
const IconShare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 12v6a2 2 0 0 0 2 2h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Helper: build a minimal .ics file and trigger download
function downloadIcs(e: CalEvent) {
  const start = new Date(e.start);
  const end = e.end ? new Date(e.end) : new Date(start.getTime() + 60 * 60 * 1000); // default 1h
  const toIcs = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ShavonLloyd//Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}@shavonlloyd.com`,
    `DTSTAMP:${toIcs(new Date())}`,
    `DTSTART:${toIcs(start)}`,
    `DTEND:${toIcs(end)}`,
    `SUMMARY:${escapeText(e.title)}`,
    e.location ? `LOCATION:${escapeText(e.location)}` : '',
    e.notes ? `DESCRIPTION:${escapeText(e.notes)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug(e.title)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function copyEvent(e: CalEvent) {
  const text = `${e.title}
${new Date(e.start).toLocaleString()}
${e.location ?? ''}
${e.notes ?? ''}`.trim();
  navigator.clipboard?.writeText(text).catch(() => {});
}

function shareEvent(e: CalEvent) {
  const url = e.href ?? window.location.href;
  const text = `${e.title} — ${new Date(e.start).toLocaleString()}`;
  if (navigator.share) {
    navigator.share({ title: e.title, text, url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(`${text}\n${url}`);
  }
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function escapeText(s: string) {
  // ICS escaping
  return s.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
}

export default function EventItem({ event }: { event: CalEvent }) {
  return (
    <li className={styles.eventItem}>
      <div className={styles.eventTitle}>{event.title}</div>
      
      {event.notes && <div className={styles.eventNotes}>{event.notes}</div>}

      <div className={styles.eventMeta}>
        {formatLocalDate(event.start).toLocaleDateString(undefined, { dateStyle: 'long' })}
        {event.location ? ` • ${event.location}` : ''}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            aria-label="Add to calendar"
            title="Add to calendar"
            onClick={() => downloadIcs(event)}
            className={styles.iconBtn}
          >
            <IconCalendar />
          </button>

          {event.href && (
            <a
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open details"
              title="Open details"
              className={styles.iconBtn}
            >
              <IconLink />
            </a>
          )}

          <button
            type="button"
            aria-label="Copy"
            title="Copy details"
            onClick={() => copyEvent(event)}
            className={styles.iconBtn}
          >
            <IconCopy />
          </button>

          <button
            type="button"
            aria-label="Share"
            title="Share"
            onClick={() => shareEvent(event)}
            className={styles.iconBtn}
          >
            <IconShare />
          </button>
        </div>
      </div>

    </li>
  );
}
