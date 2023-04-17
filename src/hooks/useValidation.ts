import { useEffect, useState, useCallback } from "react";
import { IUser } from "../types/user";

export interface IValidationOptions extends Record<string, any> {
  key: string;
  required: boolean;
  minLength?: number;
  string?:boolean;
  min?:number
}

export interface IErrorsResult extends Record<string, any> {
  nameError:boolean;
  surnameError: boolean;
  ageError:boolean;
  cityError:boolean;
}

export type ValidationKey = keyof IValidationOptions;

function useValidation(
  form: IUser,
  validations: IValidationOptions[]
): IErrorsResult {
  const [errors, setErrors] = useState<IErrorsResult>({} as IErrorsResult);

  const refresh = useCallback(() => {
    const result = Object.keys(form).reduce((acc, key) => {
      const validation: IValidationOptions | undefined = validations.find(
        (item) => item.key === key
      );
      if (validation) {
        for (const keyName in validation) {
          switch (keyName as ValidationKey) {
            case "required":
               acc[key+"Error"] = acc[key+"Error"] ? true : form[key] === "";
              break;
            case "minLength":
              acc[key+"Error"] = acc[key+"Error"] ? true :  form[key].length < validation[keyName];
              break;
            case "string":
              acc[key+"Error"] = acc[key+"Error"] ? true : !isNaN(form[key])
              break;
            case "min":
              acc[key+"Error"] = acc[key+"Error"] ? true : form[key] < validation[keyName]
              break;
            default:
              break;
          }
        }
      }
      return acc;
    }, {} as IErrorsResult);
    setErrors(result);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form])


  useEffect(() => {
    refresh()
  }, [refresh]);

  return errors;
}

export default useValidation;
