import { Button } from '../../ui-kit';
import { api } from '../../../helpers/api';
import styles from './event.module.scss'


export function BottomContent({ meId, id, owner, participants, isPastEvent, isAuthorization, setIsOpenEventPopup, setIsOpenPopupAuth, setIsJoinEventPopupOpened, setIsLeaveEventPopupOpened, isLeaveEventPopupOpened }) {

  const handleOpenAuthPopup = () => {
    setIsOpenEventPopup(false)
    setIsOpenPopupAuth(true)
  }

  const handleOpenLeavePopup = () => {
    setIsLeaveEventPopupOpened(true)
  }

  const bottomContent = () => {
    if (isAuthorization) {
      if (meJoinedEvent) {
        return <div className={styles.enty}>
          Вы присоединились к событию. Если передумали, можете <span onClick={handleOpenLeavePopup}>отменить участие.</span>
        </div>
      } else {
        return <div className={styles.btnWr}>
          <Button onClick={fetchJoinEvent}>Присоединиться к событию</Button>
        </div>
      }
    } else {
      return <div className={styles.enty}>
        <span onClick={handleOpenAuthPopup}>Войдите</span>, чтобы присоединиться к событию
      </div>
    }
  }

  const fetchJoinEvent = async () => {
    const data = await api.events.joinEvent(id)
    if (data !== null) {
      setIsOpenEventPopup(false)
      setIsJoinEventPopupOpened(true)
    }
  }

  const meJoinedEvent = participants?.some((item) => item.id === meId)

  return (
    <div className={styles.bottom}>
      {(!isPastEvent() && owner?.id !== meId) && bottomContent()}
    </div>
  );
}