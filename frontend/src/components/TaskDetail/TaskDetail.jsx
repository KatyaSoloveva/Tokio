import CreateEditTask from "../CreateEditTask/CreateEditTask";
import styles from "./TaskDetail.module.css";

const TaskDetail = ({ data }) => {
  return (
    <CreateEditTask
      formClassName={styles.formEditTask}
      editorClassName={styles.editorEditTask}
      buttonName="Сохранить редактирование"
      label={data.name}
      initialContent={data?.text || ""}
    ></CreateEditTask>
  );
};

export default TaskDetail;
