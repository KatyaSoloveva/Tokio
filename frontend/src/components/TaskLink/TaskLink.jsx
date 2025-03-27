import styles from "./TaskLink.module.css";
import Container from "../Container/Container";
import LinkComponent from "../Link/Link";
import logo from "/logo-nusya.png";
import api from "../../api";

const TaskLink = ({ tasks, onTaskClick  }) => {
  const handleClick = (taskId) => async (event) =>{
      event.preventDefault();
      try {
        const response = await api.getTask({ task_id: taskId });
        onTaskClick(response)
      } catch (error) {}
    };

  return (
    <>
      {tasks.map((task) => (
        <Container key={task.id} className={styles.taskContainer}>
          <img
            src={task.image ? `http://localhost:8000${task.image}` : logo}
            className={styles.img}
          />
          <LinkComponent
            className={styles.taskLink}
            title={task.name}
            onClick={handleClick(task.id)}
          >
            {task.name}
          </LinkComponent>
        </Container>
      ))}
    </>
  );
};

export default TaskLink;
