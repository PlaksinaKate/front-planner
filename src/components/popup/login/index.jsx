import { PopupWrapper } from "../../ui-kit/popupWrapper";
import { AUTHORIZTION_POPUP, INPUT_ERROR, INPUT_ICONS } from "../../../const";
import { Title } from "../../ui-kit/title";
import { BaseInput } from "../../ui-kit/input";
import { Button } from '../../ui-kit/button'
import { useEffect, useState } from "react";
import { isUserExist, loginUser } from "../../../api";

function Login({ isOpenPopupLogin, setIsOpenPopupLogin }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [stage, setStage] = useState(0)

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePassChange = (e) => setPass(e.target.value)

  const fetchUserExist = async (email) => {
    const response = await isUserExist(email)
    if (response.ok) {
      setStage(1)
    } else {
      setStage(2)
    }
  }

  const fetchLoginUser = async (email, pass) => {
    const response = await loginUser(email, pass)
   
  }

  function validateEmail() {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false && email != '') {
      setError(INPUT_ERROR.email);
    } else {
      setError('');
    }
  }

  const handleBtnClick = () => {
    if (stage === 0 && error === '') {
      fetchUserExist(email)
    } else if (stage === 1) {
      fetchLoginUser(email, pass)
    } else if (stage === 2 && error === '') {

    }
  }

  useEffect(() => {
    validateEmail()
  }, [email])

  const inputContent = [
    {
      type: "email",
      title: ['E-mail', <span className='red'>*</span>],
      placeholder: 'Enter email',
      value: email,
      onChange: handleEmailChange,
      error: error,
      required: true,
      setValue: setEmail,
      icon: INPUT_ICONS.cross
    },
    {
      type: "password",
      title: ['Пароль', <span className='red'>*</span>],
      placeholder: 'Введите пароль',
      value: pass,
      onChange: handlePassChange,
      error: error,
      required: true,
      setValue: setPass,
      icon: INPUT_ICONS.password
    }
  ]

  return (
    <PopupWrapper
      state={AUTHORIZTION_POPUP}
      isOpenPopup={isOpenPopupLogin}
      setIsOpenPopup={setIsOpenPopupLogin}
    >
      <Title>Вход</Title>
      <BaseInput
        type={inputContent[stage].type}
        title={inputContent[stage].title}
        placeholder={inputContent[stage].placeholder}
        value={inputContent[stage].value}
        onChange={inputContent[stage].onChange}
        error={inputContent[stage].error}
        required={inputContent[stage].required}
        setValue={inputContent[stage].setValue}
        icon={inputContent[stage].icon}
      />
      <Button onClick={handleBtnClick}>Далее</Button>
    </PopupWrapper>
  );
}

export default Login;