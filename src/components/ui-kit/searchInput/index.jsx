import styles from './searchInput.module.scss'
import { Participant } from "../participant";
import { useEffect, useState, useRef } from "react";
import { api } from "../../../helpers/api";
import clsx from "clsx";
import { Cross } from '../icons';
import defaultImg from '/default.jpg'


export function SearchInput({ isAuthorization, title, placeholder, value, setValue, required, organaizerId, error }) {
  const [users, setUsers] = useState([])
  const [searchRes, setSearchRes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleCrossClick = () => {
    inputRef.current.value = '';
    setValue([])
    setInputValue('')
    setSearchRes([])
  }

  const hangleChangeInput = (e) => {
    const inputValue = e.target.value
    setInputValue(inputValue)
    const searchResult = users?.filter((item) => item.username.includes(inputValue) && item.id !== organaizerId)
    inputValue !== '' && setSearchRes(searchResult)
  }

  const handleAddParticipant = (username) => {
    const thisUser = users?.filter((item) => item.username === username)[0]
    setValue((value) => [...value, thisUser])
    setInputValue('')
    setSearchRes([])
  }

  const fetchUsers = async () => {
    const data = await api.user.getUsers()
    data !== null && setUsers(data)
  }

  useEffect(() => {
    if (isAuthorization) {
      fetchUsers()
    }
  }, [isAuthorization])


  return (
    <div className={styles.wr}>
      <div className={styles.inputWr}>
        <div className={clsx(
          styles.input,
          {
            [styles.error]: error !== '',
            [styles.focus]: value !== '',
          }
        )}>
          <div className="row no-wrap center">
            <div className={styles.participants}>
              {value?.map((item) => {
                return <div className={clsx(styles.participant, 'row', 'center')}>
                  <div className={styles.img}>
                    <img src={defaultImg} alt="" />
                  </div>
                  <div className={styles.name}>{item.username}</div>
                </div>
              })}
            </div>
            <input
              className={clsx(
                styles.inputVal,
                {
                  [styles.error]: error !== '',
                  [styles.focus]: value !== '',
                }
              )}
              type='text'
              placeholder={placeholder}
              value={inputValue}
              onChange={hangleChangeInput}
              ref={inputRef}
              required={required}
            />
            <div className={clsx(styles.title, { [styles.visible]: value.length !== 0 || inputValue !== '' })}>{title}</div>
          </div>
        </div>

        <div className={clsx(styles.cross, { [styles.visible]: value.length !== 0 })} onClick={handleCrossClick}>
          <Cross small error={error !== ''} />
        </div>

        <div className={styles.errorText}>{error}</div>
      </div>
      <div className={clsx(styles.resultes, { [styles.visible]: searchRes.length !== 0 })}>
        {searchRes?.map((res) => {
          return <div key={res.id} className={styles.result} onClick={() => handleAddParticipant(res.username)} data-user={res.id}>
            <Participant name={res.username} />
          </div>
        })}
      </div>
    </div>
  );
}