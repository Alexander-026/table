import React, { FC, useState, useRef,  useEffect } from "react";
import classnames from "classnames";
import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  type: "text" | "number";
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  error?:boolean
};

const Input: FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  className,
  error
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTouched(false)
  }, [value])
  const input = inputRef.current;
  const isFocused = focus || !!input?.value;
  return (
    <div className={classnames(styles.field, className, { error: error && touched})}>
      <label
        className={classnames(styles.fieldLabel, {
          focus: isFocused  ,
        })}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={styles.fieldInput}
        type={type}
        id={label}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false)
          setTouched(true)
        }}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
