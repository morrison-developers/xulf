// libs/ui/src/shavon-lloyd/components/Calendar/EventList.tsx
'use client';
import { Dispatch, SetStateAction } from 'react';
import styles from './Calendar.module.css';
import EventItem from './EventItem';
import type { CalEvent } from '@xulf/ui/shavon-lloyd';
import { formatLocalDate } from './dateUtils';

export default function EventList({
  events,
  selectedDate,
  setSelectedDate
}: {
  events: CalEvent[];
  selectedDate: string | null;
  setSelectedDate: Dispatch<SetStateAction<string | null>>;
}) {

  const now = new Date();

  // Only show future events if no date is selected
  const visibleEvents = selectedDate
    ? events
    : events.filter((e) => new Date(e.start) >= now);

  const showingSingle = visibleEvents.length === 1;

  return (
    <aside className={styles.right}>
      <h4 className={styles.sidebarTitle}>
        {selectedDate
          ? formatLocalDate(selectedDate).toLocaleDateString(undefined, { dateStyle: 'long' })
          : 'Upcoming'}
      </h4>

      <ul className={styles.eventList}>
        {visibleEvents.map((e) => (
          <EventItem key={e.id} event={e} />
        ))}
        {!events.length && <li className={styles.empty}>No events</li>}
      </ul>

      {showingSingle && (
        <button
          type="button"
          className={styles.showAllBtn}
          onClick={() => {
            setSelectedDate(null);
          }}
        >
          SHOW ALL
        </button>
      )}
    </aside>
  );
}
