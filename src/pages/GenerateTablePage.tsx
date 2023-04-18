import styles from "./GenerateTablePage.module.scss";
import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import { useAppSelector } from "../hooks/redux";
import Windows from "../components/Windows/Windows";
import ListTables from "../components/ListTables/ListTables";

const GenerateTablePage = () => {
  const { mainForm, users } = useAppSelector(
    (state) => state.generateTableSlice
  );
 
  return (
    <div className={styles.generator}>
      <Windows />
      <Form data={mainForm}  />
      <Table main users={users} />
      <ListTables/>
    </div>
  );
};
export default GenerateTablePage;
