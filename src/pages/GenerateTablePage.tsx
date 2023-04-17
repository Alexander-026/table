import React from "react";
import styles from "./GenerateTablePage.module.scss";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { generateTableSlice } from "../store/slices/generateTableSlice";
import { IUser } from "../types/user";
import Confirm from "../components/Confirm/Confirm ";

let render = 0;

const GenerateTablePage = () => {
  const {
    mainForm,
    users,
    tables,
    deleteUserModalId,
    copyTableModalId,
    deleteTableModalId,
    cloneForm,
    editCloneUserModalId,
    deleteUserCloneModalId,
    copyTableCloneModalId
  } = useAppSelector((state) => state.generateTableSlice);
  const dispatch = useAppDispatch();
  const {
    updateMainForm,
    deleteUserOfMainTable,
    toggleActivateModalUserDelete,
    toggleActivateModalCopy,
    copyMainTable,
    deleteTable,
    toggleActivateModalDeleteTable,
    updateCloneForm,
    deleteUserOfCloneTable,
    toggleActivateModalCloneUserDelete,
    toggleActivateCloneModalCopy,
    copyCloneTable
    
  } = generateTableSlice.actions;

  const updateMainFormHanlder = (user: IUser) => {
    dispatch(updateMainForm(user));
  };

  const updateCloneFormHandler = (user: IUser) => {
    dispatch(updateCloneForm(user));
  };

  return (
    <div className={styles.generator}>
      <h1>Generate Table Render:{render++}</h1>
      <ModalWindow visibility={!!deleteUserModalId}>
        <Confirm
          text={"Delete user"}
          cancel={() => dispatch(toggleActivateModalUserDelete({ id: null }))}
          ok={() =>
            deleteUserModalId &&
            dispatch(deleteUserOfMainTable({ id: deleteUserModalId }))
          }
        />
      </ModalWindow>
      <ModalWindow visibility={!!deleteUserCloneModalId}>
        <Confirm
          text={"Delete user"}
          cancel={() => dispatch(toggleActivateModalCloneUserDelete(deleteUserCloneModalId))}
          ok={() =>
            deleteUserCloneModalId &&
            dispatch(deleteUserOfCloneTable({tableId:deleteUserCloneModalId.tableId, userId:deleteUserCloneModalId.id}))
          }
        />
      </ModalWindow>
      <ModalWindow visibility={!!deleteTableModalId}>
        <Confirm
          text={"Delete table"}
          cancel={() => dispatch(toggleActivateModalDeleteTable({ id: null }))}
          ok={() =>
            deleteTableModalId &&
            dispatch(deleteTable({ id: deleteTableModalId }))
          }
        />
      </ModalWindow>
      <ModalWindow visibility={!!copyTableModalId}>
        <Confirm
          text={"Copy Main Table"}
          cancel={() => dispatch(toggleActivateModalCopy({ id: null }))}
          ok={() => dispatch(copyMainTable())}
        />
      </ModalWindow>
      <ModalWindow visibility={!!copyTableCloneModalId}>
        <Confirm
          text={"Copy Clone Table"}
          cancel={() => dispatch(toggleActivateCloneModalCopy({ id: null }))}
          ok={() => copyTableCloneModalId && dispatch(copyCloneTable({tableId:copyTableCloneModalId}))}
        />
      </ModalWindow>
      <ModalWindow visibility={!!editCloneUserModalId}>
        <Form data={cloneForm} updateForm={updateCloneFormHandler} tableId={editCloneUserModalId || ''} clone />
      </ModalWindow>
      <Form data={mainForm} updateForm={updateMainFormHanlder} />
      <Table main users={users} />
      {tables.map((table) => (
        <Table key={table.id} users={table.users} tableId={table.id} />
      ))}
    </div>
  );
};

export default GenerateTablePage;
