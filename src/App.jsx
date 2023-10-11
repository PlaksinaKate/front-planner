import './App.css'
import { EventsCalendar } from './components/eventsCalendar'
import { Header } from './components/header'
import Authorization from './components/popup/authorization'
import { UiKit } from './components/ui-kit'
import './styles/main.scss'
import { useRef, useState } from 'react';

function App() {
  const calendar = useRef(null)
  const [calendarActiveMonth, setCalendarActiveMonth] = useState()

  return (
    <div>
      <Header calendar={calendar} calendarActiveMonth={calendarActiveMonth}/>
      <EventsCalendar calendar={calendar} setCalendarActiveMonth={setCalendarActiveMonth}/>
      <Authorization />
    </div>
  )
}

export default App
