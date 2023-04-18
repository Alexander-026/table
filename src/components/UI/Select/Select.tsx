import React, { FC, memo, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import { ReactComponent as ArrowSVG } from "../../../images/arrow.svg";
import classNames from "classnames";
import { SelectOptions } from "../../../types/selectOptions";


type SelectProps = {
  label: string;
  className?: string;
  error?:boolean;
  value: string | number;
  options: SelectOptions[];
  onChange: (value: string) => void;
};

const Select: FC<SelectProps> = ({
  label,
  className,
  error,
  options,
  onChange,
  value,
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false)

  useEffect(() => {
    setTouched(false)
  }, [value])

  const selectHandler = (selectedValue: string) => {
    if(selectedValue !== value) {
      onChange(selectedValue);
    }
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
      </div>
      <ul className={classNames(styles.selectList, { visibility })}>
        {options?.map((item) => (
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

export default memo(Select);
