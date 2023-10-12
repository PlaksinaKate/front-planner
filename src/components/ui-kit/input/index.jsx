import styles from './input.module.scss'
import clsx from 'clsx';
import { Cross, Password } from '../icons';
import { useRef, useState } from 'react';
import { INPUT_ICONS } from '../../../const';

export function BaseInput({ type, title, placeholder, value, error, onChange, required, setValue, icon = INPUT_ICONS.cross }) {
  const inputRef = useRef(null)
  const [inputType, setInputType] = useState(type)

  const handleCrossClick = () => {
    inputRef.current.value = '';
    setValue('')
  }

  const handlePassClick = () => {
    console.log(inputRef.current.type)
    inputRef.current.type === 'text' ?
      inputRef.current.type = 'password' :
      inputRef.current.type = 'text';
      setInputType(inputRef.current.type)
  }

  return (
    <div className={styles.inputWr}>
      <input
        className={clsx(
          styles.input,
          {
            [styles.error]: error !== '',
            [styles.focus]: value !== '',
          }
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef}
        required={required}
      />

      <div className={clsx(styles.title, { [styles.visible]: value !== '' })}>{title}</div>

      {icon === INPUT_ICONS.cross ?
        <div className={clsx(styles.cross, { [styles.visible]: value !== '' })} onClick={handleCrossClick}>
          <Cross small error={error !== ''} />
        </div>
        : icon === INPUT_ICONS.password ?
          <div className={clsx(styles.cross, { [styles.visible]: value !== '' })} onClick={handlePassClick}>
            <Password show={inputType === 'text'} />
          </div>
          :
          <div></div>
      }

      <div className={styles.errorText}>{error}</div>
    </div>
  );
}