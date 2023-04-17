import React from "react";
import styles from "./GenerateTablePage.module.scss";
import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import { useAppSelector } from "../hooks/redux";
import Windows from "../components/Windows/Windows";

const GenerateTablePage = () => {
  const { mainForm, users, tables } = useAppSelector(
    (state) => state.generateTableSlice
  );
 
  return (
    <div className={styles.generator}>
      <Windows />
      <Form data={mainForm}  />
      <Table main users={users} />
      {tables.map((table) => (
        <Table key={table.id} users={table.users} tableId={table.id} />
      ))}
    </div>
  );
};
export default GenerateTablePage;
