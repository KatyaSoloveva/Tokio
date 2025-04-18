import CreateEditTask from "../CreateEditTask/CreateEditTask";
import styles from "./TaskDetail.module.css";

const TaskDetail = ({ data }) => {
  return data && Object.keys(data).length > 0 ? (
    <CreateEditTask
      formClassName={styles.formEditTask}
      editorClassName={styles.editorEditTask}
      buttonName="Сохранить редактирование"
      label={data.name}
      initialContent={data?.text || ""}
    />
  ) : (
    <></>
  );
};

export default TaskDetail;
