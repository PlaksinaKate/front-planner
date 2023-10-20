import { PopupWrapper } from "../../ui-kit/popupWrapper";
import styles from './createEventSuccess.module.scss'
import unicorn from '/unicorn.png'
import { ERROR_POPUP } from "../../../const";
import { Title } from "../../ui-kit/title";
import { Button } from "../../ui-kit/button";
import clsx from "clsx";

export function CreateEventSuccess({ title, location, getDate, isOpenPopup, setIsOpenPopup }) {  
  const handleBtnClick = () => {
    setIsOpenPopup(false)
  }

  return (
    <PopupWrapper
      state={ERROR_POPUP}
      isOpenPopup={isOpenPopup}
      setIsOpenPopup={setIsOpenPopup}
    >
      <div className={styles.img}>
        <img src={unicorn} alt="" />
      </div>
      <div className={styles.contentWr}>
        <Title textLeft marginSmall big>Ура!</Title>
        <div className={styles.text}>Вы добавили новое событие:</div>
        <div className={clsx(styles.text, styles.red)}>{title}</div>
        <div className={clsx(styles.dateWr, 'row')}>
          <div className={styles.date}>{getDate().day}</div>
          <div className={styles.date}>{getDate().date}</div>
          <div className={styles.date}>{getDate().time}</div>
        </div>
        <div className={styles.location}>{location}</div>
        <div className={styles.btnWr}>
          <Button onClick={handleBtnClick}>Отлично</Button>
        </div>
      </div>
    </PopupWrapper>
  );
}
