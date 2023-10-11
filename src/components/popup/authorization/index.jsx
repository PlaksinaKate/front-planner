import { PopupWrapper } from "../../ui-kit/popupWrapper";
import { AUTHORIZTION_POPUP, INPUT_ERROR } from "../../../const";
import { Title } from "../../ui-kit/title";
import { BaseInput } from "../../ui-kit/input";
import { Button } from '../../ui-kit/button'
import { useEffect, useState } from "react";
import { isUserExist } from "../../../api";

function Authorization() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [stage, setStage] = useState(0)

  const handleEmalChange = (e) => {
    setEmail(e.target.value)
  }

  const fetchUserExist = async (email) => {
    const response = await isUserExist(email)
    if (!response.ok) {
      setStage(stage => stage++)
    }
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
    } else if (stage === 1 && error === '') {

    }
  }

  useEffect(() => {
    validateEmail()
  }, [email])

  return (
    <PopupWrapper
      state={AUTHORIZTION_POPUP}
    >
      <Title>Вход</Title>
      <BaseInput
        type="email"
        title={['E-mail', <span className='red'>*</span>]}
        placeholder='Enter email'
        value={email}
        onChange={handleEmalChange}
        error={error}
        required
        setValue={setEmail}
      />
      <Button onClick={handleBtnClick}>Далее</Button>
    </PopupWrapper>
  );
}

export default Authorization;