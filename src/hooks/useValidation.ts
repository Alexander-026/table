import { useEffect, useState, useCallback } from "react";
import { IUser } from "../types/user";

export interface IValidationOptions extends Record<string, any> {
  key: string;
  required: boolean;
  minLength?: number;
}

export interface IErrorsResult extends Record<string, any> {
  nameIsValid:boolean;
  surnameIsValid: boolean;
  ageIsValid:boolean;
  cityIsValid:boolean;

}


export type ValidationKey = keyof IValidationOptions;

function useValidation(
  form: IUser,
  validations: IValidationOptions[]
): IErrorsResult {
  const [errors, setErrors] = useState<IErrorsResult>({} as IErrorsResult);

  const refresh = useCallback(() => {
    const result = Object.entries(form).reduce(
      (acc, [key, value]) => {
        const validation = validations.find((item) => item.key === key);
        if (validation) {
          const { required, minLength } = validation;
          if (required) {
            acc[key + "IsValid"] = value === "";
          }
          if (minLength !== undefined) {
            acc[key + "IsValid"] = value.length < minLength;
          }
        }
        return acc;
      },
      {} as IErrorsResult
    );
    setErrors(result);
  }, [form])

  useEffect(() => {
    refresh()
  }, [refresh]);

  return errors;
}

export default useValidation;
