import { PopupWrapper } from "../../ui-kit/popupWrapper";
import { AUTHORIZTION_POPUP, INPUT_ERROR, INPUT_ICONS } from "../../../const";
import { Title } from "../../ui-kit/title";
import { BaseInput } from "../../ui-kit/input";
import { Button } from '../../ui-kit/button'
import { useState, useEffect } from "react";
import { loginUser } from "../../../api";

export function Login({ setMeId, isOpenPopupLogin, setIsOpenPopupLogin, email, setEmail, setIsOpenErrorPopup, setToken }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handlePassChange = (e) => setPass(e.target.value)

  const closePopup = () => {
    setIsOpenPopupLogin(false)
    setEmail('')
  }

  const fetchLoginUser = async () => {
    const response = await loginUser(email, pass)
    if (response.ok) {
      const data = await response.json()
      setToken(data.jwt)
      setMeId(data.user.id)
      closePopup()
    } else if (response.status < 500) {
      setError(INPUT_ERROR.password)
    } else if (response.status >= 500) {
      closePopup()
      setIsOpenErrorPopup(true)
    }
  }

  const handleBtnClick = () => {
    if (pass === '') {
      setError(INPUT_ERROR.passwordRequired);
      return
    }

    fetchLoginUser()
  }

  useEffect(() => {
    if (isOpenPopupLogin === false) {
      setPass('')
      setError('')
    }
  }, [isOpenPopupLogin])

  return (
    <PopupWrapper
      state={AUTHORIZTION_POPUP}
      isOpenPopup={isOpenPopupLogin}
      setIsOpenPopup={setIsOpenPopupLogin}
    >
      <Title>Вход</Title>
      <BaseInput
        type="password"
        title={['Пароль', <span className='red'>*</span>]}
        placeholder={'Введите пароль'}
        value={pass}
        onChange={handlePassChange}
        error={error}
        required={true}
        setValue={setPass}
        icon={INPUT_ICONS.password}
      />
      <Button onClick={handleBtnClick}>Далее</Button>
    </PopupWrapper>
  );
}