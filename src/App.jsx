import './App.css'
import { EventsCalendar } from './components/eventsCalendar'
import { Header } from './components/header'
import Login from './components/popup/Login'
import './styles/main.scss'
import { useRef, useState } from 'react';

function App() {
  const calendar = useRef(null)
  const [calendarActiveMonth, setCalendarActiveMonth] = useState()
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false)

  return (
    <div>
      <Header calendar={calendar} calendarActiveMonth={calendarActiveMonth} setIsOpenPopupLogin={setIsOpenPopupLogin} />
      <EventsCalendar calendar={calendar} setCalendarActiveMonth={setCalendarActiveMonth} />
      <Login isOpenPopupLogin={isOpenPopupLogin} setIsOpenPopupLogin={setIsOpenPopupLogin} />
    </div>
  )
}

export default App
