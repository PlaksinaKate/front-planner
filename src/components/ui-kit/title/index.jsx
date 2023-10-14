import styles from './title.module.scss'
import clsx from 'clsx';

export function Title({ children, big, marginBig, marginSmall, marignLittle, textLeft }) {
  return (
    <h2 className={clsx(
      styles.title,
      {
        [styles.big]: big,
        [styles.marignBig]: marginBig,
        [styles.marignSmall]: marginSmall,
        [styles.marignLittle]: marignLittle,
        [styles.textLeft]: textLeft,

      }
      )}>{children}</h2>
  );
}