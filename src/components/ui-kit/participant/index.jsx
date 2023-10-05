import styles from './participant.module.scss'

export function Participant({ img, name, organaizer }) {
  return (
    <div className='row center'>
      <div className={styles.img}>
        <img src={img} alt="" />
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