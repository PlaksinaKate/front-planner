import { useRef, useState } from 'react';
import { Header } from '../../components/header'
import { EventsCalendar } from '../../components/eventsCalendar'
import { Registration, Authentication, Login, Error, EventPopup, CreateEvent } from '../../components/popups'

export function MainPage() {
  const calendar = useRef(null)
  const [calendarActiveMonth, setCalendarActiveMonth] = useState()
  const [email, setEmail] = useState('')
  const [isAuthorization, setIsAuthorization] = useState(false)
  const [isOpenPopupAuth, setIsOpenPopupAuth] = useState(false)
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false)
  const [isOpenRegistation, setIsOpenRegistation] = useState(false)
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false)
  const [isOpenEventPopup, setIsOpenEventPopup] = useState(false)
  const [openedEvent, setOpenedEvent] = useState(0)
  const [meId, setMeId] = useState(0)
  const [isJoinEventPopupOpened, setIsJoinEventPopupOpened] = useState(false)
  const [isCreateEventSuccessPopupOpened, setIsCreateEventSuccessPopupOpened] = useState(false)

  const [isLeaveEventPopupOpened, setIsLeaveEventPopupOpened] = useState(false)
  const [isCreateEventPopupOpened, setIsCreateEventPopupOpened] = useState(false)

  function setToken(token) {
    sessionStorage.setItem('token', token)
    setIsAuthorization(true)
  }

  return (
    <>
      <Header
        calendar={calendar}
        calendarActiveMonth={calendarActiveMonth}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
        isAuthorization={isAuthorization}
        setIsCreateEventPopupOpened={setIsCreateEventPopupOpened}
      />
      <EventsCalendar
        meId={meId}
        calendar={calendar}
        setCalendarActiveMonth={setCalendarActiveMonth}
        setIsOpenEventPopup={setIsOpenEventPopup}
        setOpenedEvent={setOpenedEvent}
        openedEvent={openedEvent}
        isJoinEventPopupOpened={isJoinEventPopupOpened}
        isLeaveEventPopupOpened={isLeaveEventPopupOpened}
        isCreateEventPopupOpened={isCreateEventPopupOpened}
      />
      <Authentication
        email={email}
        setEmail={setEmail}
        isOpenPopupAuth={isOpenPopupAuth}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
        setIsOpenPopupLogin={setIsOpenPopupLogin}
        setOpenRegistation={setIsOpenRegistation}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Login
        setMeId={setMeId}
        email={email}
        setEmail={setEmail}
        setToken={setToken}
        isOpenPopupLogin={isOpenPopupLogin}
        setIsOpenPopupLogin={setIsOpenPopupLogin}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Registration
        email={email}
        setEmail={setEmail}
        setToken={setToken}
        setMeId={setMeId}
        setOpenRegistation={setIsOpenRegistation}
        openRegistation={isOpenRegistation}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Registration
        email={email}
        setEmail={setEmail}
        setToken={setToken}
        setOpenRegistation={setIsOpenRegistation}
        openRegistation={isOpenRegistation}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <EventPopup
        meId={meId}
        isOpenEventPopup={isOpenEventPopup}
        setIsOpenEventPopup={setIsOpenEventPopup}
        isAuthorization={isAuthorization}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
        openedEvent={openedEvent}
        setIsJoinEventPopupOpened={setIsJoinEventPopupOpened}
        isJoinEventPopupOpened={isJoinEventPopupOpened}
        setIsLeaveEventPopupOpened={setIsLeaveEventPopupOpened}
        isLeaveEventPopupOpened={isLeaveEventPopupOpened}
      />
      <Error
        isOpenErrorPopup={isOpenErrorPopup}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <CreateEvent
        isAuthorization={isAuthorization}
        setIsCreateEventPopupOpened={setIsCreateEventPopupOpened}
        isCreateEventPopupOpened={isCreateEventPopupOpened}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
        setIsCreateEventSuccessPopupOpened={setIsCreateEventSuccessPopupOpened}
        isCreateEventSuccessPopupOpened={isCreateEventSuccessPopupOpened}
      />
    </>
  );
}