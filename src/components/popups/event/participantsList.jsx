import styles from './event.module.scss'
import { Title, Participant, More } from '../../ui-kit';
import clsx from 'clsx';

export function ParticipantsList({ owner, participants }) {
  const ownerUi = () => {
    return <Participant
      name={owner?.username}
      organaizer
    />
  }

  const participantsList = participants?.map((item, i) => {
    if (i <= 4) {
      return <Participant
        key={item.id}
        name={item.username}
      />
    } else {
      return ''
    }
  })

  const moreParticipantsCount = participants?.length - 4

  return (
    <div className={styles.participants}>
      <Title small textLeft>Участники</Title>
      <div className={clsx(styles.participantsList, 'row')}>
        {ownerUi}
        {participantsList}
        {moreParticipantsCount > 0 ? <More count={moreParticipantsCount} /> : ''}
      </div>
    </div>
  );
}