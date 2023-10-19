import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import './eventsCalendar.scss';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useEffect, useState } from 'react';
import { getPublicEvents } from '../../api';
import { Event } from '../ui-kit/event';
import { FUTURE_EVENT, PAST_EVENT, ACCEDE_EVENT, CREATED_EVENT } from '../../const';

export function EventsCalendar({ meId, calendar, setCalendarActiveMonth, setIsOpenEventPopup, setOpenedEvent, isLeaveEventPopupOpened, isJoinEventPopupOpened }) {
  const [events, setEvents] = useState([])

  const fetchPublicEvents = async () => {
    const data = await getPublicEvents()
    const addNewData = []
    data.data.map(event => {
      const newEvent = {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        start: event.dateStart,
        end: event.dataEnd,
        allDay: true,
        participants: event.participants,
        photos: event.photos,
        owner: event.owner
      }
      addNewData.push(newEvent)
    })
    setEvents(addNewData)
  }

  useEffect(() => {
    if (!isJoinEventPopupOpened && !isLeaveEventPopupOpened) {
      fetchPublicEvents()
    }
  }, [isJoinEventPopupOpened, isLeaveEventPopupOpened])

  const onClickEvent = (eventInfo) => {
    const eventId = eventInfo.event.id
    const clickedEvent = events.filter((item) => item.id == eventId)
    console.log(clickedEvent[0])
    setOpenedEvent(clickedEvent[0])
    setIsOpenEventPopup(true)
  }

  function renderEventContent(eventInfo) {
    const eventId = eventInfo.event.id
    const event = events.filter((item) => item.id == eventId)[0]
    const isMeParticipants = event?.participants?.some((item) => item.id === meId)
    const isMeOwner = event?.owner?.id === meId
    const nowDate = new Date().toJSON().slice(0, 10)
    const eventDate = eventInfo.event.startStr

    const eventState = eventDate <= nowDate ? PAST_EVENT : isMeOwner ? CREATED_EVENT : isMeParticipants ? ACCEDE_EVENT : FUTURE_EVENT

    return (
      <Event state={eventState}>{eventInfo.event.title}</Event>
    );
  }


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
          eventClick={onClickEvent}
        />
      </div>
    </section>
  );
}