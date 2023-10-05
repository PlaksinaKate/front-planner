import styles from './cross.module.scss'

export function Cross() {
  return (
    <svg className={styles.cross} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M31.3139 11.515L28.4855 8.68652L20.0002 17.1718L11.515 8.68652L8.68652 11.515L17.1718 20.0002L8.68652 28.4855L11.5149 31.3139L20.0002 22.8287L28.4855 31.3139L31.3139 28.4855L22.8287 20.0002L31.3139 11.515Z" fill="#B3B3BC" />
    </svg>
  )
}