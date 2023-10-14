import { PopupWrapper } from "../../ui-kit/popupWrapper";
import { REGISTRATION_POPUP, INPUT_ICONS, INPUT_ERROR } from "../../../const";
import { Title } from "../../ui-kit/title";
import { useEffect, useState } from "react";
import { Info } from "../../ui-kit/info";
import { BaseInput } from "../../ui-kit/input";
import { Button } from "../../ui-kit/button";
import styles from './registration.module.scss'
import { registerUser } from "../../../api";

export function Registration({ email, setEmail, setOpenRegistation, openRegistation, setIsOpenErrorPopup }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorRepeatPassword, setErrorRepeatPassword] = useState('')
  const [stage, setStage] = useState(0)

  const handleUserNameChange = (e) => setUserName(e.target.value)
  const handlePassChange = (e) => setPassword(e.target.value)
  const handleRepeatPassChange = (e) => setRepeatPassword(e.target.value)

  const closePopup = () => {
    setEmail('')
    setOpenRegistation(false)
  }

  function validatePass() {
    const reg = /(?=^.{8,32}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (reg.test(password) === false) {
      setErrorPassword(INPUT_ERROR.validatePassword);
      setRepeatPassword('')
    } else {
      setErrorPassword('');
    }
  }

  const isPassSame = () => {
    if (password !== repeatPassword) {
      setErrorRepeatPassword(INPUT_ERROR.passwordNotSame)
    } else {
      setStage(1)
      setErrorRepeatPassword('')
    }
  }

  const fetchRegisterUser = async () => {
    console.log(email)
    const response = await registerUser(userName, email, password)
    if (response.ok) {
      const data = await response.json()
      const token = data.jwt
      closePopup()
    } else {
      //что-то пошло не так
      closePopup()
      setIsOpenErrorPopup(true)
    }
  }

  const btnClick = () => {
    validatePass();
    isPassSame();
  }

  const isBtnDisabled = !(userName !== '' && password !== '' && repeatPassword !== '')

  useEffect(() => {
    if (stage === 1) {
      fetchRegisterUser()
    }
  }, [stage])

  useEffect(() => {
    setUserName('')
    setPassword('')
    setRepeatPassword('')
    setEmail('')
  }, [openRegistation])

  return (
    <PopupWrapper
      state={REGISTRATION_POPUP}
      isOpenPopup={openRegistation}
      setIsOpenPopup={setOpenRegistation}
    >
      <Title marignLittle>Регистрация</Title>
      <Info>
        {'В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )'}
      </Info>
      <div className={styles.inputs}>
        <BaseInput
          type="text"
          title="Ваше имя"
          placeholder='Введите ваше имя'
          value={userName}
          onChange={handleUserNameChange}
          required={true}
          setValue={setUserName}
        />
        <BaseInput
          type="password"
          title="Пароль"
          placeholder='Введите пароль'
          value={password}
          onChange={handlePassChange}
          error={errorPassword}
          required={true}
          setValue={setPassword}
          icon={INPUT_ICONS.password}
        />
        <BaseInput
          type="password"
          title="Повторить пароль"
          placeholder='Введите пароль'
          value={repeatPassword}
          onChange={handleRepeatPassChange}
          error={errorRepeatPassword}
          required={true}
          setValue={setRepeatPassword}
          icon={INPUT_ICONS.password}
        />
      </div>
      <div className={styles.btn}>
        <Button disabled={isBtnDisabled} onClick={btnClick}>Зарегистрироваться</Button>
      </div>
    </PopupWrapper>
  );
}