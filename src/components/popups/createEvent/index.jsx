import { PopupWrapper } from "../../ui-kit/popupWrapper";
import { Title } from "../../ui-kit/title";
import { BaseInput } from "../../ui-kit/input";
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from './createEvent.module.scss'
import { Participant } from "../../ui-kit/participant";
import { getMe } from "../../../api";
import { Button } from "../../ui-kit/button";
import { Textarea } from "../../ui-kit/textarea";
import { SearchInput } from "../../ui-kit/searchInput";
import { FileInput } from "../../ui-kit/fileInput";
import { INPUT_ICONS } from "../../../const";

export function CreateEvent({ isAuthorization, setIsCreateEventPopupOpened, isCreateEventPopupOpened }) {
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [participant, setParticipant] = useState([])
  const [img, setImg] = useState([])
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [errorStartDate, setErrorStartDate] = useState('')
  const [errorEndDate, setErrorEndDate] = useState('')
  const [errorTime, setErrorTime] = useState('')

  const validatorDate = (date, setError) => {
    const aTmp = date.split(".");
    if (aTmp.length != 3) {
      setError('Некорректная дата')
      return false;
    }

    const nowYear = new Date().getFullYear()

    if (parseInt(aTmp[2], 10) < nowYear) {
      setError('Некорректная дата')
      return false;
    }

    const sTmp = aTmp[2] + '-' + aTmp[1] + '-' + aTmp[0];

    if (new Date(sTmp) == 'Invalid Date') {
      setError('Некорректная дата')
      return false;
    } else {
      setError('')
      return true;
    }
  }

  const timeValidate = (time) => {
    const isValid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
      console.log(isValid)
    if(!isValid) {
      setErrorTime('Некорректное время')
    } else {
      setErrorTime('')
    }
  }

  const handleEventNameChange = (e) => { setEventName(e.target.value) }
  const handleDateStartChange = (e) => {
    const value = e.target.value
    validatorDate(value, setErrorStartDate)
    setDateStart(value)
    if (value > dateEnd && dateEnd !== '') setErrorStartDate('Некорректная дата')
  }
  const handleDateEndChange = (e) => {
    const value = e.target.value
    validatorDate(value, setErrorEndDate)
    setDateEnd(e.target.value)
    if (value < dateStart) setErrorEndDate('Некорректная дата')
  }
  const handleTimeChange = (e) => { 
    const value = e.target.value
    value.length === 5 && timeValidate(value)
    setTime(value)
   }

  const handleLocationChange = (e) => { setLocation(e.target.value) }

  const fetchGetMe = async () => {
    const data = await getMe()
    if (data !== null) {
      setOrganizer(data)
    }
  }

  useEffect(() => {
    if (isAuthorization) {
      fetchGetMe()
    }
  }, [isAuthorization])

  const isDisabled = eventName !== '' && eventDesc !== '' && dateStart!== '' && errorStartDate === '' && dateEnd!== '' && errorEndDate === '' && errorTime === '' && location !== ''

  return (
    <PopupWrapper
      isOpenPopup={isCreateEventPopupOpened}
      setIsOpenPopup={setIsCreateEventPopupOpened}
    >
      <Title marginBig>Создание события</Title>
      <div className={clsx(styles.inputs, 'row', 'space-between')}>
        <div className={styles.leftContent}>
          <BaseInput
            type="text"
            title={['Название', <span className='red'>*</span>]}
            placeholder='Введите название'
            value={eventName}
            onChange={handleEventNameChange}
            required={true}
            setValue={setEventName}
          />
          <Textarea
            title={['Описание', <span className='red'>*</span>]}
            placeholder='Введите описание'
            value={eventDesc}
            required={true}
            setValue={setEventDesc}
            error={''}
            cols="4"
            rows="5"
          />
          <SearchInput
            organaizerId={organizer.id}
            title='Участники'
            placeholder='Начните вводить имя'
            value={participant}
            setValue={setParticipant}
            error={''}
          />
        </div>
        <div className={styles.rightContent}>
          <div className={clsx(styles.dates, 'row', 'space-between', 'no-wrap')}>
            <BaseInput
              type="text"
              placeholder='ДД.ММ.ГГГГ'
              title={['Начало', <span className='red'>*</span>]}
              value={dateStart}
              onChange={handleDateStartChange}
              error={errorStartDate}
              required={true}
              setValue={setDateStart}
              icon={INPUT_ICONS.date}
            />
            <BaseInput
              type="text"
              placeholder='ДД.ММ.ГГГГ'
              title={['Конец', <span className='red'>*</span>]}
              value={dateEnd}
              onChange={handleDateEndChange}
              error={errorEndDate}
              required={true}
              setValue={setDateEnd}
              icon={INPUT_ICONS.date}
            />
          </div>
          <BaseInput
            type="text"
            placeholder='00:00'
            title={['Время', <span className='red'>*</span>]}
            value={time}
            error={errorTime}
            onChange={handleTimeChange}
            required={true}
            setValue={setTime}
          />
          <BaseInput
            type="text"
            placeholder='Введите место проведения'
            title={['Место проведения', <span className='red'>*</span>]}
            value={location}
            onChange={handleLocationChange}
            required={true}
            setValue={setLocation}
          />
          <Participant
            name={organizer.username}
            organaizer
          />
        </div>
        <FileInput
          value={img}
          setValue={setImg}
        />
      </div>
      <div className={styles.btnWr}>
        <Button disabled={!isDisabled}>Создать</Button>
      </div>
    </PopupWrapper>
  );
}