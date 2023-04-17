import React, { FC } from "react";
import styles from "./Table.module.scss";
import { v4 as uuid } from "uuid";
import Button from "../UI/Button/Button";
import { ReactComponent as DeleteSVG } from "../../images/delete.svg";
import { useAppDispatch } from "../../hooks/redux";
import { IUser } from "../../types/user";
import { generateTableSlice } from "../../store/slices/generateTableSlice";

type TableProps = {
  users: IUser[];
  main?: boolean;
  tableId?: string;
};
const Table: FC<TableProps> = ({ users, main, tableId }) => {
  const dispatch = useAppDispatch();
  const {
    editUserOfMainTable,
    toggleActivateModalUserDelete,
    toggleActivateModalCopy,
    toggleActivateModalDeleteTable,
    editUserOfCloneTable,
    toggleActivateModalCloneUserDelete,
    toggleActivateCloneModalCopy,
  } = generateTableSlice.actions;

  const setUserHandler = (id: string, tableId?: string) => {
    if (main && !tableId) {
      dispatch(editUserOfMainTable({ id }));
    }
    if (!main && tableId) {
      dispatch(editUserOfCloneTable({ tableId, userId: id }));
    }
  };
  const deleteUserHanlder = (id: string, tableId?: string) => {
    if (main && !tableId) {
      dispatch(toggleActivateModalUserDelete({ id }));
    }
    if (!main && tableId) {
      dispatch(toggleActivateModalCloneUserDelete({ tableId, id }));
    }
  };

  const copyTableHandler = (id?: string) => {
    if (main && !id) {
      dispatch(toggleActivateModalCopy({ id: 1 }));
    }
    if (!main && id) {
      dispatch(toggleActivateCloneModalCopy({ id }));
    }
  };

  const deleteTableHandler = (id: string) => {
    dispatch(toggleActivateModalDeleteTable({ id }));
  };

  const countEmptyCell: number = 10 - users.length <= 0 ? 0 : 10 - users.length;
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableWrapperControl}>
        <Button
          disabled={!users.length}
          onClick={() => copyTableHandler(tableId)}
          variant="primary"
        >
          Copy table
        </Button>
        {!main && tableId && (
          <DeleteSVG
            onClick={() => deleteTableHandler(tableId)}
            className={styles.tableWrapperControlDelete}
          />
        )}
      </div>
      <table className={styles.tableWrapperTable}>
        <thead>
          <tr>
            <th className={styles.name}>Name</th>
            <th className={styles.surname}>Surname</th>
            <th className={styles.age}>Age</th>
            <th className={styles.city}>City</th>
            <th className={styles.lastCell}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.name} title={user.name}>
                {user.name}
              </td>
              <td className={styles.surname} title={user.surname}>
                {user.surname}
              </td>
              <td className={styles.age}>
                {user.age}
              </td>
              <td className={styles.city} title={user.city}>
                {user.city}
              </td>
              <td className={styles.lastCell}>
                <div className={styles.lastCellControl}>
                  <span
                    onClick={() => user.id && setUserHandler(user.id, tableId)}
                    className={styles.lastCellControlEditRow}
                  >
                    Edit
                  </span>
                  <span
                    onClick={() =>
                      user.id && deleteUserHanlder(user.id, tableId)
                    }
                    className={styles.lastCellControlDeleteRow}
                  >
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          ))}

          {main &&
            Array(countEmptyCell)
              .fill("")
              .map(() => (
                <tr key={uuid()}>
                  <td className={styles.name} />
                  <td className={styles.surname} />
                  <td className={styles.age} />
                  <td className={styles.city} />
                  <td className={styles.lastCell} />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
