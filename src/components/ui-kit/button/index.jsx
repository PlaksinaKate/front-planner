import { createElement } from "react";
import styles from './button.module.scss'
import clsx from "clsx";

function BaseButton({ component = 'button', children, ...props }) {
  return createElement(component, props, children)
}

export function Button({className, disabled, border, ...props}) {
  return (
    <BaseButton
      className={clsx(
        styles.button,
        {
          [styles.disabled]: disabled,
          [styles.border]: border
        },
        className,
      )
      }
      {...props}
    />
  )
}