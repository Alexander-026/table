import React from "react";
import styles from "./GenerateTablePage.module.scss";
import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { generateTableSlice } from "../store/slices/generateTableSlice";
import { IUser } from "../types/user";
import Windows from "../components/Windows/Windows";

const GenerateTablePage = () => {
  const { mainForm, users, tables } = useAppSelector(
    (state) => state.generateTableSlice
  );
  const dispatch = useAppDispatch();
  const { updateMainForm } = generateTableSlice.actions;
  const updateMainFormHanlder = (user: IUser) => {
    dispatch(updateMainForm(user));
  };
  return (
    <div className={styles.generator}>
      <Windows />
      <Form data={mainForm} updateForm={updateMainFormHanlder} />
      <Table main users={users} />
      {tables.map((table) => (
        <Table key={table.id} users={table.users} tableId={table.id} />
      ))}
    </div>
  );
};
export default GenerateTablePage;
