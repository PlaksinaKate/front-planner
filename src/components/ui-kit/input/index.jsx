import styles from './input.module.scss'
import clsx from 'clsx';
import { Cross, Password, CalendarIcon } from '../icons';
import { useRef, useState } from 'react';
import { INPUT_ICONS } from '../../../helpers/const';

export function BaseInput({ type, title, placeholder, value, error = '', onChange, required, setValue, icon = INPUT_ICONS.cross, maxLength, props }) {
  const inputRef = useRef(null)
  const [inputType, setInputType] = useState(type)

  const handleCrossClick = () => {
    inputRef.current.value = '';
    setValue('')
  }

  const handlePassClick = () => {
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
        maxLength={maxLength}
        {...props}
      />

      <div className={clsx(styles.title, { [styles.visible]: value !== '' })}>{title}</div>

      {icon === INPUT_ICONS.cross &&
        <div className={clsx(styles.cross, { [styles.visible]: value !== '' })} onClick={handleCrossClick}>
          <Cross small error={error !== ''} />
        </div>
      }
      {icon === INPUT_ICONS.password &&
        <div className={clsx(styles.cross, { [styles.visible]: value !== '' })} onClick={handlePassClick}>
          <Password show={inputType === 'text'} />
        </div>
      }
      {icon === INPUT_ICONS.date &&
        <div className={styles.date}>
          <CalendarIcon />
        </div>
      }

      <div className={styles.errorText}>{error}</div>
    </div>
  );
}