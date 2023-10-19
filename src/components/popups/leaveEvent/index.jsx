import { PopupWrapper } from "../../ui-kit/popupWrapper";
import styles from './leaveEvent.module.scss'
import rock from '/rock.png'
import { REGISTRATION_POPUP } from "../../../const";
import { Title } from "../../ui-kit/title";
import { Button } from "../../ui-kit/button";
import clsx from "clsx";
import { leaveEvent } from "../../../api";

export function LeaveEvent({ event, setIsLeaveEventPopupOpened, isLeaveEventPopupOpened, setIsOpenEventPopup }) {
  const handleBtnNoClick = () => setIsLeaveEventPopupOpened(false)
  const handleBtnYesClick = () => fetchLeaveEvent()

  const fetchLeaveEvent = async () => {
    const data = await leaveEvent(event.id)
    if (data !== null) {
      setIsLeaveEventPopupOpened(false)
      setIsOpenEventPopup(false)
    }
  }

  return (
    <PopupWrapper
      state={REGISTRATION_POPUP}
      isOpenPopup={isLeaveEventPopupOpened}
      setIsOpenPopup={setIsLeaveEventPopupOpened}
    >
      <Title marginBig>Вы действительно хотите<br /> отменить участие?</Title>
      <div className={clsx(styles.btnsWr, 'row', 'space-between')}>
        <Button border onClick={handleBtnNoClick}>Нет</Button>
        <Button onClick={handleBtnYesClick}>Да</Button>
      </div>
    </PopupWrapper>
  );
}
