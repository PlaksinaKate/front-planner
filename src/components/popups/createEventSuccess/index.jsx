import { PopupWrapper, Title, Button } from "../../ui-kit";
import styles from './createEventSuccess.module.scss'
import unicorn from '/unicorn.png'
import { ERROR_POPUP } from "../../../const";
import clsx from "clsx";
import { useEffect } from "react";

export function CreateEventSuccess({ title, location, getDate, isOpenPopup, setIsOpenPopup, closePopup }) {
  const handleBtnClick = () => {
    setIsOpenPopup(false)
    closePopup()
  }

  useEffect(() => {
    !isOpenPopup && closePopup()
  }, [isOpenPopup])

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
