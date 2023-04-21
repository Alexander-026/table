import React, {  FC, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import { ReactComponent as ArrowSVG } from "../../../images/arrow.svg";
import classNames from "classnames";
import { SelectOptions } from "../../../types/selectOptions";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IUser } from "../../../types/user";



type SelectProps = {
  label: string;
  name: string;
  onChange: UseFormSetValue<IUser>,
  register: UseFormRegister<any>,
  className?: string;
  error?:boolean;
  options: SelectOptions[];
  value: string
};

const Select: FC<SelectProps> = ({
  label,
  name,
  onChange,
  register,
  className,
  error,
  options,
  value,
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false)
 
  useEffect(() => {
    setTouched(false)
  }, [value])



  const selectHandler = (optionValue: string) => {
    onChange(name, optionValue, {shouldValidate: true})
    setVisibility(false);
  };
  const selected = options?.find((item) => item.value === value)
  const isFocused = selected || visibility
  const hasError = error && touched && !selected


  return (
    <div  tabIndex={0}  onBlur={(e:any) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setVisibility(false)
        setTouched(true)
      }
    }} className={classNames(styles.select, className)}>
      <div
        onClick={() => setVisibility(!visibility)}
       
        className={classNames(styles.selectField, {error:hasError})}
      >
        <span className={classNames(styles.selectFieldLabel, {focus: isFocused})}>{label}</span>
        <span className={styles.selectFieldValue}>{selected?.value}</span>
        <ArrowSVG
          className={classNames(styles.selectFieldArrow, { visibility })}
        />
        <input readOnly  className={styles.selectFieldSelect} {...register(name)}  id={name} />
      </div>
      <ul className={classNames(styles.selectList, { visibility })}>
        {options.map((item) => (
          <li
            onClick={() => selectHandler(item.value)}
            className={classNames(styles.selectListItem, {selected: item.value === value })}
            key={item.value}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
