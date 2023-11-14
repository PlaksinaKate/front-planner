import styles from './textarea.module.scss'
import clsx from 'clsx';
import { useId } from 'react';

export function Textarea({ title, placeholder, name, cols, rows, setValue, value, error, maxLength }) {
  const id = useId()
  const handleTexteareaChange = (e) => setValue(e.target.value)

  return (
    <div className={styles.wr}>
      <textarea
      id={id}
        className={clsx(
          styles.textarea,
          {
            [styles.error]: error !== '',
            [styles.focus]: value !== '',
          }
        )}
        placeholder={placeholder}
        value={value}
        name={name}
        cols={cols}
        rows={rows}
        onChange={handleTexteareaChange}
        maxLength={maxLength}
      />
      <label htmlFor={id} className={clsx(styles.title, { [styles.visible]: value !== '' })}>{title}</label>

      <p className={styles.errorText}>{error}</p>
    </div>
  );
}