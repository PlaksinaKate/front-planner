import { Arrow, Logo } from '../ui-kit/icons';
import styles from './header.module.scss'
import { Button } from '../ui-kit/button'
import clsx from 'clsx';

export function Header() {
  return (
    <header>
      <div className='wr'>
        <div className='flex space-between alight-end'>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={clsx(styles.right_content, 'row space-between alight-end')}>
            <div className={clsx(styles.calendar_content, 'row center')}>
              <div className={styles.calendar_month}>Сентябрь</div>
              <div className={styles.calendar_arrows}>
                <span className={styles.calendar_arrow}>
                  <Arrow height="48" width="64" weight="4" fill />
                </span>
                <span className={styles.calendar_arrow}>
                  <Arrow height="48" width="64" weight="4" fill right />
                </span>
              </div>
            </div>
            <div className={styles.user_content}>
              <div className={styles.user_btn}>
                <Button>Войти</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}