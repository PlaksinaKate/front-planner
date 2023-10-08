import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import './eventsCalendar.scss';
import ruLocale from '@fullcalendar/core/locales/ru';

export function EventsCalendar({ calendar, setCalendarActiveMonth }) {
  return (
    <section className='events_calendar'>
      <div className='wr'>
        <FullCalendar
          locale={ruLocale}
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          headerToolbar={false}
          datesSet={(arg) => {
            setCalendarActiveMonth(arg.view.title.split(' ')[0])
          }}
          ref={calendar}
        />
      </div>
    </section>
  );
}