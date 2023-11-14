import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import './eventsCalendar.scss';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useEffect, useState, useCallback } from 'react';
import { api } from '../../helpers/api';
import { Event, Wrapper } from '../ui-kit';
import { FUTURE_EVENT, PAST_EVENT, ACCEDE_EVENT, CREATED_EVENT } from '../../helpers/const';

export function EventsCalendar({
  meId,
  calendar,
  setCalendarActiveMonth,
  setIsOpenEventPopup,
  setOpenedEvent,
  isLeaveEventPopupOpened,
  isJoinEventPopupOpened,
  isCreateEventPopupOpened }) {
    
  const [events, setEvents] = useState(null)

  const fetchPublicEvents = useCallback(async () => {
    const { data } = await api.events.getPublicEvents()
    const mappedData = data.map(event => ({
      ...event,
      start: event.dateStart,
      end: event.dataEnd,
      allDay: true,
    }));

    setEvents(mappedData)
  }, [])

  useEffect(() => {
    if (!isJoinEventPopupOpened && !isLeaveEventPopupOpened) {
      fetchPublicEvents()
    }
  }, [isJoinEventPopupOpened, isLeaveEventPopupOpened, isCreateEventPopupOpened])

  const onClickEvent = (eventInfo) => {
    const eventId = eventInfo.event.id
    const clickedEvent = events.find((item) => item.id === eventId)
    setOpenedEvent(clickedEvent)
    setIsOpenEventPopup(true)
  }

  function renderEventContent(eventInfo) {
    const eventId = eventInfo.event.id
    const event = events.filter((item) => item.id === eventId)[0]
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
      <Wrapper>
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
      </Wrapper>
    </section>
  );
}