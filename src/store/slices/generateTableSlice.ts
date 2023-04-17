import {
  createUser,
  editUserOfMainTable,
  updateMainTable,
  deleteUserOfMainTable,
  toggleActivateModalUserDelete,
  toggleActivateModalCopy,
  copyMainTable,
  deleteTable,
  toggleActivateModalDeleteTable,
  editUserOfCloneTable,
  updateCloneTable,
  deleteUserOfCloneTable,
  toggleActivateModalCloneUserDelete,
  toggleActivateCloneModalCopy,
  copyCloneTable
} from "./generateTableActions";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { ITable } from "../../types/table";

export interface IGenerateTableSlice {
  mainForm: IUser;
  cloneForm: IUser;
  users: IUser[];
  tables: ITable[];
  copyTableModalId: null | string | 1;
  copyTableCloneModalId: null | string;
  deleteUserModalId: null | string;
  deleteUserCloneModalId:null | {tableId:string, id:string};
  deleteTableModalId: null | string;
  editCloneUserModalId: null | string;

}

export const defaultForm: IUser = {
  name: "",
  surname: "",
  age: "",
  city: "",
};

export const initialState: IGenerateTableSlice = {
  mainForm: defaultForm,
  cloneForm: defaultForm,
  users: [],
  tables: [],
  copyTableModalId: null,
  copyTableCloneModalId: null,
  deleteUserModalId: null,
  deleteUserCloneModalId: null,
  deleteTableModalId: null,
  editCloneUserModalId: null
};

export const generateTableSlice = createSlice({
  name: "generate-table",
  initialState,
  reducers: {
    createUser,
    editUserOfMainTable,
    updateMainTable,
    deleteUserOfMainTable,
    toggleActivateModalUserDelete,
    toggleActivateModalCopy,
    copyMainTable,
    deleteTable,
    toggleActivateModalDeleteTable,
    editUserOfCloneTable,
    updateCloneTable,
    deleteUserOfCloneTable,
    toggleActivateModalCloneUserDelete,
    toggleActivateCloneModalCopy,
    copyCloneTable
  },
});

export default generateTableSlice.reducer;
