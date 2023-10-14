import styles from './info.module.scss'
import clsx from 'clsx';
import { InfoIcon } from '../icons';

export function Info({ error, children }) {
  return (
    <div className={styles.info}>
      <div className='flex center'>
        <div className={clsx(
          styles.icon,
          { [styles.error]: error }
        )
        }>
          <InfoIcon small color={error ? '#F51B1B' : '#0D0C0C'} />
        </div>
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
}