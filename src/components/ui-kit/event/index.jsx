import styles from './event.module.scss';
import clsx from 'clsx';

export function Event({state='past', children}) {
  return(
    <div
      className={clsx(
        styles.event,
        {
          [styles.past]: state==='past',
          [styles.future]: state==='future',
          [styles.accede]: state==='accede',
          [styles.created]: state==='created',
        }
      )}
    >{children}</div>
  )
}