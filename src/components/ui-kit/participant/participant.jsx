import styles from './participant.module.scss'
import defaultImg from '/default.jpg'
import clsx from 'clsx'

export function Participant({ name, organaizer }) {
  return (
    <div className={clsx(styles.participant, 'row', 'center')}>
      <div className={styles.img}>
        <img src={defaultImg} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {organaizer ?
          <div className={styles.organaizer}>Организатор</div>
          : ''
        }
      </div>
    </div>
  )
}