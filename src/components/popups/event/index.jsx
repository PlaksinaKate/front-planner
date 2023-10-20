import styles from './event.module.scss'
import { PopupWrapper } from '../../ui-kit/popupWrapper';
import { Title } from '../../ui-kit/title';
import clsx from 'clsx';
import { getDate } from '../../../helpers';
import { ParticipantsList } from './participantsList'
import { Gallery } from './gallery';
import { Info } from '../../ui-kit/info';
import { BottomContent } from './bottomContent';
import { JoinEventSuccess } from '../joinEventSuccess';
import { LeaveEvent } from '../leaveEvent';

export function EventPopup({ meId, isOpenEventPopup, setIsOpenEventPopup, isAuthorization, setIsOpenPopupAuth, openedEvent, isJoinEventPopupOpened, setIsJoinEventPopupOpened, setIsLeaveEventPopupOpened, isLeaveEventPopupOpened }) {
  const { id, title, description, start, location, participants, photos, owner } = openedEvent

  const pastEvent = () => {
    if (isPastEvent()) {
      return <div className={styles.pastEvent}>
        <Info>Мероприятие уже прошло</Info>
      </div>
    }
  }

  const isPastEvent = () => {
    const nowDate = new Date().toJSON().slice(0, 10)
    return start < nowDate
  }

  return (
    <>
      <PopupWrapper
        isOpenPopup={isOpenEventPopup}
        setIsOpenPopup={setIsOpenEventPopup}
      >
        <div className={styles.wr}>
          <Title marignLittle={isPastEvent()}>{title}</Title>
          {pastEvent()}
          <div className={clsx('row', 'space-between', styles.descWr)}>
            <div className={styles.datePlace}>
              <div className={styles.dates}>
                <div className={styles.date}>{getDate(start).day}</div>
                <div className={styles.date}>{getDate(start).date}</div>
                <div className={styles.date}>{getDate(start).time}</div>
              </div>
              <div className={styles.place}>{location}</div>
            </div>
            <div className={styles.desc}>{description}</div>
          </div>
          <ParticipantsList owner={owner} participants={participants} />
          {photos && <Gallery photos={photos} />}
          <BottomContent
            meId={meId}
            id={id}
            owner={owner}
            participants={participants}
            isPastEvent={isPastEvent}
            isAuthorization={isAuthorization}
            setIsOpenPopupAuth={setIsOpenPopupAuth}
            setIsOpenEventPopup={setIsOpenEventPopup}
            setIsJoinEventPopupOpened={setIsJoinEventPopupOpened}
            setIsLeaveEventPopupOpened={setIsLeaveEventPopupOpened}
            isLeaveEventPopupOpened={isLeaveEventPopupOpened}
          />
        </div>
      </PopupWrapper>
      <JoinEventSuccess
        title={title}
        location={location}
        getDate={() => getDate(start)}
        isJoinEventPopupOpened={isJoinEventPopupOpened}
        setIsJoinEventPopupOpened={setIsJoinEventPopupOpened}
      />
      <LeaveEvent 
        event={openedEvent}
        setIsLeaveEventPopupOpened={setIsLeaveEventPopupOpened}
        isLeaveEventPopupOpened={isLeaveEventPopupOpened}
        setIsOpenEventPopup={setIsOpenEventPopup}
      />
    </>
  );
}