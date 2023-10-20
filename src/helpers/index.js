import { MONTHS, WEEKS_DAY } from '../const';

export const getDate = (start) => {
  if (start !== null) {
    const dateStart = new Date(start)
    const day = WEEKS_DAY[dateStart.getDay()]
    const date = dateStart.getDate() + ' ' + MONTHS[dateStart.getMonth()]
    const hours = dateStart.getHours()
    const minutes = dateStart.getMinutes()
    const hoursModify = hours < 10 ? '0' + hours : hours
    const minutesModify = minutes < 10 ? '0' + minutes : minutes
    const time = `${hoursModify}:${minutesModify}`
    return {
      day: day,
      date: date,
      time: time
    }
  }
}