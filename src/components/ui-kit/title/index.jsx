import styles from './title.module.scss'
import clsx from 'clsx';

export function Title({ children, big, marginBig, marginSmall }) {
  return (
    <h2 className={clsx(
      styles.title,
      {
        [styles.big]: big,
        [styles.marignBig]: marginBig,
        [styles.marignSmall]: marginSmall,

      }
      )}>{children}</h2>
  );
}