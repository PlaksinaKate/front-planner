import { Arrow, Logo } from '../ui-kit/icons';
import styles from './header.module.scss'
import { Button } from '../ui-kit/button'
import clsx from 'clsx';

export function Header({ calendar, calendarActiveMonth, setIsOpenPopupAuth }) {
  const calendarApi = calendar.current?.getApi()
  const nextMonth = () => calendarApi.next()
  const prevMonth = () => calendarApi.prev()

  const handleLoginClick = () => setIsOpenPopupAuth(true)

  return (
    <header>
      <div className='wr'>
        <div className='flex space-between alight-end'>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={clsx(styles.right_content, 'row space-between alight-end')}>
            <div className={clsx(styles.calendar_content, 'row center')}>
              <div className={styles.calendar_month}>{calendarActiveMonth}</div>
              <div className={styles.calendar_arrows}>
                <span className={styles.calendar_arrow} onClick={prevMonth}>
                  <Arrow height="48" width="64" weight="4" fill />
                </span>
                <span className={styles.calendar_arrow} onClick={nextMonth}>
                  <Arrow height="48" width="64" weight="4" fill right />
                </span>
              </div>
            </div>
            <div className={styles.user_content}>
              <div className={styles.user_btn} onClick={handleLoginClick}>
                <Button>Войти</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}