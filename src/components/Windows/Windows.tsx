import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { generateTableSlice } from '../../store/slices/generateTableSlice';
import { IUser } from '../../types/user';
import ModalWindow from '../ModalWindow/ModalWindow';
import Confirm from '../Confirm/Confirm ';
import Form from '../Form/Form';

const Windows = () => {
  const {
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
  const updateCloneFormHandler = (user: IUser) => {
    dispatch(updateCloneForm(user));
  };
  return (
    <>
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
          text={"Delete clone user"}
          cancel={() => dispatch(toggleActivateModalCloneUserDelete(null))}
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
    </>
  );
};

export default Windows;