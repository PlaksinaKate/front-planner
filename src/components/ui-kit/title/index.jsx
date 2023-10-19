import styles from './title.module.scss'
import clsx from 'clsx';

export function Title({ children, big, small, marginBig, marginSmall, marignLittle, textLeft, marginNone }) {
  return (
    <h2 className={clsx(
      styles.title,
      {
        [styles.big]: big,
        [styles.small]: small,
        [styles.marignBig]: marginBig,
        [styles.marignSmall]: marginSmall,
        [styles.marignLittle]: marignLittle,
        [styles.textLeft]: textLeft,
        [styles.marginNone]: marginNone,
      }
      )}>{children}</h2>
  );
}