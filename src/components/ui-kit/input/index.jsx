import styles from './input.module.scss'
import clsx from 'clsx';
import { Cross } from '../icons';
import { useRef } from 'react';

export function BaseInput({ type, title, placeholder, value, error, onChange, required, setValue }) {
  const inputRef = useRef(null)

  const handleCrossClick = () => {
    inputRef.current.value = '';
    setValue('')
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

      <div className={clsx(styles.title,{[styles.visible]: value !== ''})}>{title}</div>

      <div className={clsx( styles.cross,{[styles.visible]: value !== ''})} onClick={handleCrossClick}>
        <Cross small error={error !== ''} />
      </div>

      <div className={styles.errorText}>{error}</div>
    </div>
  );
}