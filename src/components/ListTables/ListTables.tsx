import Table from '../Table/Table';
import { useAppSelector } from '../../hooks/redux';

const ListTables = () => {
  const {  tables } = useAppSelector(
    (state) => state.generateTableSlice
  );
  return (
    <>
     {tables.map((table) => (
        <Table key={table.id} users={table.users} tableId={table.id} />
      ))}
    </>
  );
};

export default ListTables ;