import styles from './info.module.scss'
import clsx from 'clsx'

export function Info({ small }) {
  return (
    <svg className={clsx(
      styles.info,
      {[styles.small]: small}
    )} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM13.2318 8.2956C13.2318 8.57174 13.0079 8.7956 12.7318 8.7956H11.2685C10.9923 8.7956 10.7685 8.57174 10.7685 8.2956V7.22891C10.7685 6.95277 10.9923 6.72891 11.2685 6.72891H12.7318C13.0079 6.72891 13.2318 6.95277 13.2318 7.22891L13.2318 8.2956ZM13.173 16.7713C13.173 17.0474 12.9492 17.2713 12.673 17.2713H11.313C11.0368 17.2713 10.813 17.0474 10.813 16.7713L10.813 11.2005C10.813 10.9243 11.0368 10.7005 11.313 10.7005H12.673C12.9492 10.7005 13.173 10.9243 13.173 11.2004L13.173 16.7713Z" fill="#0D0C0C" />
    </svg>
  )
}