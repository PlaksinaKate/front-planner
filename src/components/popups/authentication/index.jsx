import { PopupWrapper } from "../../ui-kit";
import { AUTHORIZTION_POPUP, INPUT_ERROR } from "../../../helpers/const";
import { Title } from "../../ui-kit/title";
import { BaseInput } from "../../ui-kit/input";
import { Button } from '../../ui-kit/button'
import { useEffect, useState } from "react";
import { api } from "../../../helpers/api";
import styles from './authentication.module.scss'

export function Authentication({ isOpenPopupAuth, setIsOpenPopupAuth, setOpenRegistation, setIsOpenPopupLogin, setEmail, email, setIsOpenErrorPopup }) {
  const [error, setError] = useState('')
  const [stage, setStage] = useState(0)

  const handleEmailChange = (e) => setEmail(e.target.value)

  const fetchUserExist = async () => {
    const response = await api.user.isUserExist(email)
    if (response.ok) {
      setStage(2)
    } else {
      setStage(3)
    }
  }

  function validateEmail() {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false && email != '') {
      setError(INPUT_ERROR.email);
    } else {
      setStage(1)
      setError('');
    }
  }

  const handleBtnClick = () => {
    if (email === '') {
      setError(INPUT_ERROR.emailRequired);
      return
    }

    validateEmail()
  }

  useEffect(() => {
    if (stage === 1 && error === '') {
      fetchUserExist(email)
    } else if (stage === 2) {
      setIsOpenPopupAuth(false)
      setIsOpenPopupLogin(true)
    } else if (stage === 3) {
      setIsOpenPopupAuth(false)
      setOpenRegistation(true)
    }
  }, [stage])

  useEffect(() => {
    if (isOpenPopupAuth === false) {
      setStage(0)
      setError('')
    }
  }, [isOpenPopupAuth])

  return (
    <PopupWrapper
      state={AUTHORIZTION_POPUP}
      isOpenPopup={isOpenPopupAuth}
      setIsOpenPopup={setIsOpenPopupAuth}
    >
      <Title>Вход</Title>
      <div className={styles.wr}>
        <BaseInput
          type="email"
          title={['E-mail', <span className='red'>*</span>]}
          placeholder='Enter email'
          value={email}
          onChange={handleEmailChange}
          error={error}
          required={true}
          setValue={setEmail}
        />
      </div>
      <Button onClick={handleBtnClick}>Далее</Button>
    </PopupWrapper>
  );
}

