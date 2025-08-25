// libs/ui/src/shavon-lloyd/components/Calendar/EventList.tsx
'use client';
import styles from './Calendar.module.css';
import EventItem from './EventItem';
import type { CalEvent } from '@xulf/ui/shavon-lloyd';

export default function EventList({
  events,
  selectedDate,
}: {
  events: CalEvent[];
  selectedDate: string | null;
}) {
  return (
    <aside className={styles.right}>
      <h4 className={styles.sidebarTitle}>
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })
          : 'Upcoming'}
      </h4>

      <ul className={styles.eventList}>
        {events.map((e) => (
          <EventItem key={e.id} event={e} />
        ))}
        {!events.length && <li className={styles.empty}>No events</li>}
      </ul>
    </aside>
  );
}
