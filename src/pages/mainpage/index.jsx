import { useRef, useState } from 'react';
import { Header } from '../../components/header'
import { EventsCalendar } from '../../components/eventsCalendar'
import { Registration, Authentication, Login, Error } from '../../components/popup'

export function MainPage() {
  const calendar = useRef(null)
  const [calendarActiveMonth, setCalendarActiveMonth] = useState()
  const [email, setEmail] = useState('')
  const [isOpenPopupAuth, setIsOpenPopupAuth] = useState(false)
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false)
  const [isOpenRegistation, setIsOpenRegistation] = useState(false)
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false)

  return (
    <>
      <Header
        calendar={calendar}
        calendarActiveMonth={calendarActiveMonth}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
      />
      <EventsCalendar calendar={calendar} setCalendarActiveMonth={setCalendarActiveMonth} />
      <Authentication
        isOpenPopupAuth={isOpenPopupAuth}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
        setIsOpenPopupLogin={setIsOpenPopupLogin}
        setOpenRegistation={setIsOpenRegistation}
        setEmail={setEmail}
        email={email}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Login
        isOpenPopupLogin={isOpenPopupLogin}
        setIsOpenPopupLogin={setIsOpenPopupLogin}
        email={email}
        setEmail={setEmail}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Registration
        email={email}
        setEmail={setEmail}
        setOpenRegistation={setIsOpenRegistation}
        openRegistation={isOpenRegistation}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
      <Error
        isOpenErrorPopup={isOpenErrorPopup}
        setIsOpenErrorPopup={setIsOpenErrorPopup}
      />
    </>
  );
}