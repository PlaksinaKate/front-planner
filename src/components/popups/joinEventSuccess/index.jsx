import { PopupWrapper, Title, Button } from "../../ui-kit";
import styles from './joinEventSuccess.module.scss'
import rock from '/rock.png'
import { ERROR_POPUP } from "../../../helpers/const";
import clsx from "clsx";

export function JoinEventSuccess({ title, location, getDate, isJoinEventPopupOpened, setIsJoinEventPopupOpened }) {  
  const handleBtnClick = () => {
    setIsJoinEventPopupOpened(false)
  }
  const {day, date, time} = getDate();

  return (
    <PopupWrapper
      state={ERROR_POPUP}
      isOpenPopup={isJoinEventPopupOpened}
      setIsOpenPopup={setIsJoinEventPopupOpened}
    >
      <div className={styles.img}>
        <img src={rock} alt="" />
      </div>
      <div className={styles.contentWr}>
        <Title textLeft margin="small" size="big">Поздравляем!</Title>
        <div className={styles.text}>Вы теперь участник события:</div>
        <div className={clsx(styles.text, styles.red)}>{title}</div>
        <div className={clsx(styles.dateWr, 'row')}>
          <div className={styles.date}>{day}</div>
          <div className={styles.date}>{date}</div>
          <div className={styles.date}>{time}</div>
        </div>
        <div className={styles.location}>{location}</div>
        <div className={styles.btnWr}>
          <Button onClick={handleBtnClick}>Отлично</Button>
        </div>
      </div>
    </PopupWrapper>
  );
}
