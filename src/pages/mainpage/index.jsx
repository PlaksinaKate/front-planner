import { useRef, useState } from 'react';
import { Header } from '../../components/header'
import { EventsCalendar } from '../../components/eventsCalendar'
import { Registration, Authentication, Login, Error } from '../../components/popup'

export function MainPage() {
  const calendar = useRef(null)
  const [calendarActiveMonth, setCalendarActiveMonth] = useState()
  const [email, setEmail] = useState('')
  const [isAuthorization, setIsAuthorization] = useState(false)
  const [isOpenPopupAuth, setIsOpenPopupAuth] = useState(false)
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false)
  const [isOpenRegistation, setIsOpenRegistation] = useState(false)
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false)

  function setToken (token) {
    localStorage.setItem(
      'token',
      JSON.stringify({
        value: token,
        timeStamp: new Date().getTime(),
      })
    )
    setIsAuthorization(true)
  }

  return (
    <>
      <Header
        calendar={calendar}
        calendarActiveMonth={calendarActiveMonth}
        setIsOpenPopupAuth={setIsOpenPopupAuth}
        isAuthorization={isAuthorization}
      />
      <EventsCalendar calendar={calendar} setCalendarActiveMonth={setCalendarActiveMonth} />
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