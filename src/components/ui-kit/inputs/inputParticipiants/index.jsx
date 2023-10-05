import { Participant } from '../../participant'
import styles from './arrow.module.scss'
import clsx from 'clsx'

export function InputParticipiants() {
  return (
    <div className={styles.wr}>
      <input type="text" className={styles.input}/>
      <div className={styles.dropdown}>
        <Participant name="Илья"/>
        <Participant name="Илья"/>
        <Participant name="Илья"/>
        <Participant name="Илья"/>
      </div>
    </div>
  )
}