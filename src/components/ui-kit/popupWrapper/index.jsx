import styles from './popupWrapper.module.scss'
import { Cross } from '../icons';
import clsx from 'clsx';
import { AUTHORIZTION_POPUP, REGISTRATION_POPUP, ERROR_POPUP, EVENT_POPUP } from '../../../const';

export function PopupWrapper({ children, state = EVENT_POPUP, isOpenPopup, setIsOpenPopup }) {
  const handleCrossClick = () => {
    setIsOpenPopup(false)
  }
  return (
    <div className={clsx(styles.wr, { [styles.visible]: isOpenPopup })}>
      <div className={clsx(
        styles.popup,
        {
          [styles.auth]: state === AUTHORIZTION_POPUP,
          [styles.registration]: state === REGISTRATION_POPUP,
          [styles.error]: state === ERROR_POPUP,
          [styles.event]: state === EVENT_POPUP,        }
      )}>
        <div className={styles.cross} onClick={handleCrossClick}>
          <Cross />
        </div>
        {children}
      </div>
    </div >
  );
}
