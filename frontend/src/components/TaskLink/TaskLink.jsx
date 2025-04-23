import styles from "./TaskLink.module.css";
import Container from "../Container/Container";
import LinkComponent from "../Link/Link";
import logo from "/logo-nusya.png";

const TaskLink = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <Container className={styles.taskContainer} key={task.id}>
          <img
            src={task.image ? `${task.image}` : logo}
            className={styles.img}
          />
          <LinkComponent
            to={`/tasks/${task.id}`}
            className={styles.taskLink}
            activeClassName={styles.activeLink}
          >
            {task.name}
          </LinkComponent>
        </Container>
      ))}
    </>
  );
};

export default TaskLink;
