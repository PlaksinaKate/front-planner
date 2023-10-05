import { Button } from "./button"
import { Cross, CalendarIcon, Arrow, Info } from "./icons"
import { Event } from "./event"
import { Participant } from "./participant"

export function UiKit() {
  return (
    <>
      <Button>button</Button>
      <Button component="a" disabled>button</Button>
      <Button border>button</Button>
      <Button component="a" border disabled>button</Button>
      <Event>Event</Event>
      <Event state="future">Event</Event>
      <Event state="accede">Event</Event>
      <Event state="created">Event</Event>
      <Cross />
      <CalendarIcon />
      <Arrow />
      <Arrow right/>
      <Info />
      <Info small/>
      <Participant 
        name='Илья'
        organaizer
      />
    </>
  )
}