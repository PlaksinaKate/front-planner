import { REGISTRATION_POPUP, INPUT_ICONS, INPUT_ERROR } from "../../../helpers/const";
import { PopupWrapper, Title, Info, BaseInput, Button } from "../../ui-kit";
import { useEffect, useState } from "react";
import styles from './registration.module.scss'
import { registerUser } from "../../../helpers/api";

export function Registration({ email, setEmail, setOpenRegistation, openRegistation, setIsOpenErrorPopup, setToken }) {
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
    const response = await registerUser(userName, email, password)
    if (response.ok) {
      const data = await response.json()
      setToken(data.jwt)
      setMeId(data.data.id)
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