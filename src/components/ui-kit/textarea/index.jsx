import styles from './textarea.module.scss'
import clsx from 'clsx';

export function Textarea({ title, placeholder, name, cols, rows, setValue, value, error }) {

  const handleTexteareaChange = (e) => setValue(e.target.value)

  return (
    <div className={styles.wr}>
      <textarea
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
      />
      <div className={clsx(styles.title, { [styles.visible]: value !== '' })}>{title}</div>

      <div className={styles.errorText}>{error}</div>
    </div>
  );
}