import React, { FC,  useEffect} from "react";
import styles from "./From.module.scss";
import { v4 as uuid } from "uuid";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import { SelectOptions } from "../../types/selectOptions";
import { IUser } from "../../types/user";
import { useAppDispatch } from "../../hooks/redux";
import {  generateTableSlice } from "../../store/slices/generateTableSlice";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import { userSchema } from "../../schema/userSchema";


const options: SelectOptions[] = [
  { label: "Riga", value: "Riga" },
  { label: "Daugavpils", value: "Daugavpils" },
  { label: "Jūrmala", value: "Jūrmala" },
  { label: "Ventspils", value: "Ventspils" },
];

type FormProps = {
  data: IUser;
  clone?:boolean
  tableId?:string
};

const Form: FC<FormProps> = ({ data,  clone, tableId }) => {
  const { register, handleSubmit, watch, reset,getValues,setValue ,  formState: { errors ,isValid} } = useForm<IUser>({
      mode: 'all',
     resolver: yupResolver(userSchema)
  });
  watch()
  const dispatch = useAppDispatch();
  const { createUser, updateMainTable, updateCloneTable} = generateTableSlice.actions;
  const submitMainHandler = (dataUser:IUser) => {
    if(dataUser.id){
      dispatch(updateMainTable(dataUser))
    }else {
      const user: IUser = { ...dataUser, id: uuid() };
      dispatch(createUser(user));
    }
    reset()
  }
  const submitCloneHandler = (dataUser:IUser) => {
    if(tableId) {
      dispatch(updateCloneTable({tableId,cloneUser:dataUser}))
      reset()
    }
  }

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit((clone && tableId) ?  submitCloneHandler :  submitMainHandler)} className={styles.form}>
      <Input
        value={getValues().name}
        type="text"
        label="Name"
        name="name"
        register={register}
        error={!!errors.name}
      />
      <Input
        value={getValues().surname}
        type="text"
        label="Surname"
        name="surname"
        register={register}
        error={!!errors.surname}
      />
      <Input
        value={getValues().age}
        type="number"
        name="age"
        label="Age"
        register={register}
        error={!!errors.age}
      />
      <Select
        value={getValues().city}
        label="City"
        name='city'
        onChange={setValue}
        register={register}
        options={options}
        error={!!errors.city}
      />
      <Button
        type="submit"
        size="large"
        variant="primary"
        uppercase
        full
        disabled={!isValid}
      >
        {getValues().id ? 'update' : 'add'}
      </Button>
    </form>
  );
};

export default Form;
