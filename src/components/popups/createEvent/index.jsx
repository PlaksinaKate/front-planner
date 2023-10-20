import { PopupWrapper, Title, BaseInput, Participant, Button, Textarea, SearchInput, FileInput } from "../../ui-kit";
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from './createEvent.module.scss'
import { getMe, createEvent, createEventPhotos, getUploadFile } from "../../../api";
import { CreateEventSuccess } from "../createEventSuccess";
import { getDate } from "../../../helpers";
import { INPUT_ICONS } from "../../../const";

export function CreateEvent({ isAuthorization, setIsCreateEventPopupOpened, isCreateEventPopupOpened, setIsOpenErrorPopup, isCreateEventSuccessPopupOpened, setIsCreateEventSuccessPopupOpened}) {
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [participant, setParticipant] = useState([])
  const [img, setImg] = useState([])
  const [errorImg, setErrorImg] = useState('')
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
    if (!isValid) {
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

  const isDisabled = eventName !== '' && eventDesc !== '' && dateStart !== '' && errorStartDate === '' && dateEnd !== '' && errorEndDate === '' && errorTime === '' && location !== ''

  const getStart = () => {
    const [h, m] = time.split(':')
    const [day, month, year] = dateStart.split('.')
    return new Date(year, (month - 1), day, h, m, 0, 0)
  }

  const fetchCreateEvent = async () => {
    const event = {
      title: eventName,
      description: eventDesc,
      dateStart: getStart(),
      location: location,
      participants: participant
    }

    const data = await createEvent(event)
    if (data !== null) {
      fetchUploadFile()
      fetchCreateEventPhotos(data.id)
    } else {
      setIsCreateEventPopupOpened(false)
      setIsOpenErrorPopup(true)
    }
  }

  const fetchCreateEventPhotos = async (eventId) => {
    const event = {
      title: eventName,
      description: eventDesc,
      dateStart: getStart(),
      location: location,
      owner: organizer,
      participants: participant,
      photos: img
    }

    const data = await createEventPhotos(eventId, event)
    if (data !== null) {
      setIsCreateEventPopupOpened(false)
      setIsCreateEventSuccessPopupOpened(true)
    } else {
      setIsCreateEventPopupOpened(false)
      setIsOpenErrorPopup(true)
    }
  }

  const fetchUploadFile = async () => {
    console.log(img)
    const data = await getUploadFile(img)
    /* if (data !== null) {
      setIsCreateEventPopupOpened(false)
      setIsCreateEventSuccessPopupOpened(true)
    } else {
      setIsCreateEventPopupOpened(false)
      setIsOpenErrorPopup(true)
    } */
  }

  const handleCreateEvent = () => {
    fetchCreateEvent()
  }

  return (
    <>
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
              maxLength={140}
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
              maxLength={1000}
            />
            <SearchInput
              organaizerId={organizer.id}
              title='Участники'
              placeholder='Начните вводить имя'
              value={participant}
              setValue={setParticipant}
              error={''}
              isAuthorization={isAuthorization}
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
              maxLength={5}
            />
            <BaseInput
              type="text"
              placeholder='Введите место проведения'
              title={['Место проведения', <span className='red'>*</span>]}
              value={location}
              onChange={handleLocationChange}
              required={true}
              setValue={setLocation}
              maxLength={140}
            />
            <Participant
              name={organizer.username}
              organaizer
            />
          </div>
          <FileInput
            setValue={setImg}
            setErrorImg={setErrorImg}
            errorImg={errorImg}
          />
        </div>
        <div className={styles.btnWr}>
          <Button disabled={!isDisabled} onClick={handleCreateEvent}>Создать</Button>
        </div>
      </PopupWrapper>
      <CreateEventSuccess
        title={eventName}
        location={location}
        getDate={() => getDate(getStart())}
        isOpenPopup={isCreateEventSuccessPopupOpened}
        setIsOpenPopup={setIsCreateEventSuccessPopupOpened}
      />
    </>
  );
}