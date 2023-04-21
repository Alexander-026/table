import React, { FC,  useState, memo} from "react";
import classnames from "classnames";
import styles from "./Input.module.scss";
import { UseFormRegister } from "react-hook-form";


type InputProps =  {
  label: string;
  name: string;
  type: 'text' | 'number';
  value: string | number;
  register: UseFormRegister<any>,
  className?: string;
  error?:boolean
};

const Input: FC<InputProps> = ({
  label,
  name,
  type,
  value,
  register,
  className,
  error,
 
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  
  const isFocused = focus || !!value ;

  return (
    <div className={classnames(styles.field, className, {error})}>
      <label
        className={classnames(styles.fieldLabel, {
          focus: isFocused,
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={styles.fieldInput}
        type={type}
        id={name}
        onFocus={() => setFocus(true)}
        {...register(name, {onBlur: () => setFocus(false), valueAsNumber: type === 'number'} )} 
      />
    </div>
  );
};

export default memo(Input) ;
