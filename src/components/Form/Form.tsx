import React, { FC,  useEffect, useState } from "react";
import styles from "./From.module.scss";
import { v4 as uuid } from "uuid";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import { SelectOptions } from "../../types/selectOptions";
import { IUser } from "../../types/user";
import useDebounce from "../../hooks/useDebounce";
import useValidation, { IValidationOptions } from "../../hooks/useValidation";
import { useAppDispatch } from "../../hooks/redux";
import { defaultForm, generateTableSlice } from "../../store/slices/generateTableSlice";

const options: SelectOptions[] = [
  { label: "Riga", value: "Riga" },
  { label: "Daugavpils", value: "Daugavpils" },
  { label: "Jūrmala", value: "Jūrmala" },
  { label: "Ventspils", value: "Ventspils" },
];

type FormProps = {
  data: IUser;
  updateForm: (user: IUser) => void;
  clone?:boolean
  tableId?:string
};

const Form: FC<FormProps> = ({ data, updateForm, clone, tableId }) => {
  const [dataUser, setDataUser] = useState<IUser>(data);
  const dispatch = useAppDispatch();
  const debouncedUser = useDebounce(dataUser, 500);
  const { nameError,surnameError,ageError,cityError } =
    useValidation(dataUser, [
      { key: "name", required: true, minLength: 2 ,string:true},
      { key: "surname", required: true, minLength: 2, string:true },
      { key: "age", required: true, min: 1 },
      { key: "city", required: true },
    ] as IValidationOptions[]);

  const { createUser, updateMainTable, updateCloneTable} = generateTableSlice.actions;

  const updateUserHandler = (key: string, value: string | number): void => {
    setDataUser((pre) => {
      const newUser = { ...pre };
      newUser[key] = value;
      return newUser;
    });
  };
 
  const submitMainHandler = () => {
    if(dataUser.id){
      dispatch(updateMainTable(dataUser))
    }else {
      const user: IUser = { ...dataUser, id: uuid() };
      dispatch(createUser(user));
    }
    setDataUser(defaultForm);
  }

  const submitCloneHandler = () => {
    if(tableId) {
      dispatch(updateCloneTable({tableId,cloneUser:dataUser}))
    }
  }

  useEffect(() => {
    updateForm(debouncedUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUser]);

  useEffect(() => {
    setDataUser(data);
  }, [data]);
  const isValid = nameError || surnameError || ageError || cityError

  return (
    <div className={styles.form}>
      <Input
        value={dataUser.name}
        label="Name"
        type="text"
        onChange={(value) => updateUserHandler("name", value)}
        error={nameError}
      />
      <Input
        value={dataUser.surname}
        label="Surname"
        type="text"
        onChange={(value) => updateUserHandler("surname", value)}
        error={surnameError}
      />
      <Input
        value={dataUser.age}
        label="Age"
        type="number"
        onChange={(value) => updateUserHandler("age", value)}
        error={ageError}
      />
      <Select
        value={dataUser.city}
        label="City"
        options={options}
        error={cityError}
        onChange={(value) => updateUserHandler("city", value)}
      />
      <Button
        onClick={() => (clone && tableId) ?  submitCloneHandler() :  submitMainHandler()}
        size="large"
        variant="primary"
        uppercase
        full
        disabled={isValid}
      >
        {dataUser.id ? 'update' : 'add'}
      </Button>
    </div>
  );
};

export default Form;
