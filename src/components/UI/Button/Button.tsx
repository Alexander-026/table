import React, {ButtonHTMLAttributes, FC} from "react";
import styles from './Button.module.scss';
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string,
  variant: "primary" | "secondary",
  size?: 'small' | 'large'
  uppercase?:boolean;
  full?:boolean
}

const Button:FC<ButtonProps> = ({className,variant,size, children, uppercase, full, ...rest}, ref) => {
  return (
    <button className={classNames(styles.button, variant,size, {uppercase, full})} {...rest} {...ref}>
      {children}
    </button>
  );
};

export default Button;