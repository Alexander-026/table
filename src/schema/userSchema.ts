import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().matches(/^[a-zA-Z ,.'-]+$/).min(2).required(),
  surname: yup.string().matches(/^[a-zA-Z ,.'-]+$/).min(2).required(),
  age: yup.number().positive().integer().required(),
  city: yup.string().required(),
}).required()