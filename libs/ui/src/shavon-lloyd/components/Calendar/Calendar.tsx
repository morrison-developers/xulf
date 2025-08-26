// libs/ui/src/shavon-lloyd/components/Calendar/Calendar.tsx
'use client';
import React, { useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import styles from './Calendar.module.css';
import EventList from './EventList';
import type { CalEvent } from '@xulf/ui/shavon-lloyd';

type CalendarProps = {
  events: CalEvent[];
};

export function Calendar({ events }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dayEvents = useMemo(() => {
    if (!selectedDate) return events;
    const d = selectedDate.slice(0, 10);
    return events.filter(e => e.start.slice(0, 10) === d);
  }, [selectedDate, events]);

  return (
    <div className={styles.wrap}>
      <div className={styles.calendarCard}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className="myCalendarWrap">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{ left: 'title', center: '', right: 'prev,next' }}
                height="auto"
                fixedWeekCount={false}
                dayMaxEventRows={2}
                dateClick={(info: DateClickArg) => setSelectedDate(info.dateStr)}
                eventClick={(info: EventClickArg) => setSelectedDate(info.event.startStr)}
              />
            </div>
          </div>

          <EventList
            events={dayEvents}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}
