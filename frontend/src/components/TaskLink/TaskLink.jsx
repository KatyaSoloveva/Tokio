import styles from "./TaskLink.module.css";
import Container from "../Container/Container";
import LinkComponent from "../Link/Link";
import logo from "/logo-nusya.png";

const Task = ({ tasks }) => (
  <>
    {tasks.map((task) => (
      <Container key={task.id} className={styles.taskContainer}>
        <img
          src={task.image ? `http://localhost:8000${task.image}` : logo}
          className={styles.img}
        />
        <LinkComponent to="/" className={styles.taskLink} title={task.name}>
          {task.name}
        </LinkComponent>
      </Container>
    ))}
  </>
);

export default Task;
