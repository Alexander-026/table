import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { IGenerateTableSlice, defaultForm } from "./generateTableSlice"
import { IUser } from "../../types/user"
import { v4 as uuid } from "uuid";


export const updateMainForm:CaseReducer<IGenerateTableSlice, PayloadAction<IUser>> = (state, action) => {
  state.mainForm = action.payload
}
export const updateCloneForm:CaseReducer<IGenerateTableSlice, PayloadAction<IUser>> = (state, action) => {
  state.cloneForm = action.payload
}

export const createUser:CaseReducer<IGenerateTableSlice, PayloadAction<IUser>> = (state,action) => {
  state.users.push(action.payload)
  state.mainForm = defaultForm
}


export const updateMainTable:CaseReducer<IGenerateTableSlice, PayloadAction<IUser>> = (state, action) => {
  const updatedUser = action.payload
  state.users = state.users.map((user) => user.id === updatedUser.id ? ({...user,...updatedUser}) : ({...user}))
}
export const updateCloneTable:CaseReducer<IGenerateTableSlice, PayloadAction<{tableId:string, cloneUser:IUser}>> = (state, action) => {
  const {tableId,cloneUser} = action.payload
  state.tables = state.tables.map((table) => {
    if(table.id === tableId) {
      return {...table, users: table.users.map((user) => user.id === cloneUser.id ? ({...cloneUser}) : ({...user}))}
    }else {
    return table
    }
  })
  state.editCloneUserModalId = null
}


export const editUserOfMainTable:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string}>> = (state,action) => {
  const {id} = action.payload
  const users = state.users
  const user = users.find((u) => u.id === id)
  if(user) {
    state.mainForm = user
  }
}

export const editUserOfCloneTable:CaseReducer<IGenerateTableSlice, PayloadAction<{tableId:string, userId:string}>> = (state,action) => {
  const {tableId,userId} = action.payload
  const table = state.tables.find((table) => table.id === tableId)
  if(table) {
    const user = table.users.find((user) => user.id === userId)
    if(user) {
      state.cloneForm = user
      state.editCloneUserModalId = tableId
    }
  }
}



export const deleteUserOfMainTable:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string}>> = (state, action) => {
  const {id} = action.payload
  state.users = state.users.filter((user) => user.id !== id)
  state.deleteUserModalId = null
}

export const deleteUserOfCloneTable:CaseReducer<IGenerateTableSlice, PayloadAction<{tableId:string, userId:string}>> = (state, action) => {
  const {tableId,userId} = action.payload
  const tables = state.tables.map((table) => {
    if(table.id === tableId) {
      return {...table, users: table.users.filter((user) => user.id !== userId)}
    }else {
      return table
    }
  })
  //? If we delete the last user, then the table is deleted automatically
  const filteredTables = tables.filter((table) => table.id !== tableId)
  console.log('filteredTables', filteredTables)
  const users = filteredTables.find((table) => table.id === tableId)?.users.length
  state.tables =  !!users ? tables : filteredTables
  state.deleteUserCloneModalId = null
}


export const toggleActivateModalUserDelete:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string|null}>> = (state, action) => {
  const {id} = action.payload
  state.deleteUserModalId = id
}
export const toggleActivateModalCloneUserDelete:CaseReducer<IGenerateTableSlice, PayloadAction<{tableId:string, id:string} | null>> = (state, action) => {
  state.deleteUserCloneModalId = action.payload
}


export const toggleActivateModalCopy:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string|null|1}>> = (state, action) => {
  const {id} = action.payload
  state.copyTableModalId = id
}
export const toggleActivateCloneModalCopy:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string|null}>> = (state, action) => {
  const {id} = action.payload
  state.copyTableCloneModalId = id
}

export const toggleActivateModalDeleteTable:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string|null}>> = (state, action) => {
  const {id} = action.payload
  state.deleteTableModalId = id
}

export const copyMainTable:CaseReducer<IGenerateTableSlice> = (state) => {
  const users = state.users
  const id = uuid()
  state.tables.unshift({id,users})
  state.copyTableModalId = null
}
export const copyCloneTable:CaseReducer<IGenerateTableSlice, PayloadAction<{tableId:string}>> = (state, action) => {
  const {tableId} = action.payload
  const currentTable = state.tables.find((table) => table.id === tableId)
  if(currentTable) {
    const id = uuid()
    const currentTableIndex = state.tables.indexOf(currentTable)
    state.tables.splice(currentTableIndex,0, {id, users: currentTable.users})
    state.copyTableCloneModalId = null
  }
 
}


export const deleteTable:CaseReducer<IGenerateTableSlice, PayloadAction<{id:string}>> = (state,action) => {
  const {id} = action.payload
  state.tables = state.tables.filter((table) => table.id !== id)
  state.deleteTableModalId = null
}



