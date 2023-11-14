import { PopupWrapper, Title, Button } from "../../ui-kit";
import styles from './leaveEvent.module.scss'
import { REGISTRATION_POPUP } from "../../../helpers/const";
import clsx from "clsx";
import { api } from "../../../helpers/api";

export function LeaveEvent({ event, setIsLeaveEventPopupOpened, isLeaveEventPopupOpened, setIsOpenEventPopup }) {
  const handleBtnNoClick = () => setIsLeaveEventPopupOpened(false)
  const handleBtnYesClick = () => fetchLeaveEvent()

  const fetchLeaveEvent = async () => {
    const data = await api.events.leaveEvent(event.id)
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
      <Title margin="big">Вы действительно хотите<br /> отменить участие?</Title>
      <div className={clsx(styles.btnsWr, 'row', 'space-between')}>
        <Button border onClick={handleBtnNoClick}>Нет</Button>
        <Button onClick={handleBtnYesClick}>Да</Button>
      </div>
    </PopupWrapper>
  );
}
