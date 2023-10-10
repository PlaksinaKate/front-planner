import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import './eventsCalendar.scss';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useEffect, useState } from 'react';
import { getPublicEvents } from '../../api';
import { Event } from '../ui-kit/event';

export function EventsCalendar({ calendar, setCalendarActiveMonth }) {
  const [events, setEvents] = useState([])

  const fetchPublicEvents = async () => {
    const data = await getPublicEvents()
    const addNewData = []
    console.log(data.data)
    data.data.map(event => {
      const newEvent = {
        title: event.title,
        start: event.dateStart,
        end: event.dataEnd,
        allDay: true,
        participants: event.participants
      }
      addNewData.push(newEvent)
    })
      setEvents(addNewData)
  }

  useEffect(() => {
    fetchPublicEvents()
  }, [])

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
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </section>
  );
}

function renderEventContent(eventInfo) {
  const nowDate = new Date().toJSON().slice(0, 10)
  const eventDate = eventInfo.event.startStr
  const eventState = eventDate >= nowDate ? 'future' : 'past'
  
  return (
    <Event state={eventState}>{eventInfo.event.title}</Event>
  );
}