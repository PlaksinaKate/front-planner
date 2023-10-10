import styles from './event.module.scss';
import clsx from 'clsx';
import { FUTURE_EVENT, PAST_EVENT, ACCEDE_EVENT, CREATED_EVENT } from '../../../const';

export function Event({ state = { PAST_EVENT }, children }) {
  const eventStateStyles = {
    [styles.past]: state === PAST_EVENT,
    [styles.future]: state === FUTURE_EVENT,
    [styles.accede]: state === ACCEDE_EVENT,
    [styles.created]: state === CREATED_EVENT,
  }
  return (
    <div className={clsx(
      styles.eventWr,
      eventStateStyles
    )}>
      <div
        className={clsx(
          styles.event,
          eventStateStyles
        )}
      >{children}</div>
    </div>
  )
}