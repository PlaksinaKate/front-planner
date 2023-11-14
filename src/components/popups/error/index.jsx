import { PopupWrapper, Title, Button } from "../../ui-kit";
import styles from './error.module.scss'
import curlic from '/curlic.png'
import { ERROR_POPUP } from "../../../helpers/const";

export function Error({ isOpenErrorPopup, setIsOpenErrorPopup }) {
  
  const handleBtnClick = () => {
    setIsOpenErrorPopup(false)
  }

  return (
    <PopupWrapper
      state={ERROR_POPUP}
      isOpenPopup={isOpenErrorPopup}
      setIsOpenPopup={setIsOpenErrorPopup}
    >
      <div className={styles.img}>
        <img src={curlic} alt="" />
      </div>
      <div className={styles.contentWr}>
        <Title textLeft margin="small" size="big">Что-то пошло<br /> не так</Title>
        <div className={styles.text}>Попробуйте позже</div>
        <div className={styles.btnWr}>
          <Button onClick={handleBtnClick}>Хорошо</Button>
        </div>
      </div>
    </PopupWrapper>
  );
}