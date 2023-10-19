import styles from './participant.module.scss'
import defaultImg from '/default.jpg'
import clsx from 'clsx'

export function More({ count }) {
  return (
    <div className={clsx(styles.more, "row", "center", 'no-wrap', 'space-between')}>
      <div className={clsx(styles.imgMore, 'row')}>
        <div>
          <img src={defaultImg} alt="" />
        </div>
        <div>
          <img src={defaultImg} alt="" />
        </div>
        <div>
          <img src={defaultImg} alt="" />
        </div>
      </div>
      <div className={styles.count}>Еще +{count}</div>
    </div>
  )
}