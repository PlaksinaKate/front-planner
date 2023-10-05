import styles from './arrow.module.scss'
import clsx from 'clsx'

export function Arrow({ right, width, height, weight, fill }) {
  return (
    <svg className={clsx(styles.arrow,
      {
        [styles.right]: right,
        [styles.fill]: fill
      }
    )} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" fill="none" >
      <path d="M19 6L9.70711 15.2929C9.31658 15.6834 9.31658 16.3166 9.70711 16.7071L19 26" stroke="#0D0C0C" strokeWidth={weight} strokeLinecap="round" />
    </svg >
  )
}