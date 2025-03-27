import { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";
import TaskLink from "../../components/TaskLink/TaskLink";
import api from "../../api";
import styles from "./MyTasks.module.css";

const Tasks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getMyTasks();
        setData(tasks);
      } catch (error) {}
    };
    fetchTasks();
  }, []);

  return (
    <Main className={styles.mainMyTasks}>
        <Container className={styles.tasksContainer}>
          <TaskLink tasks={data}></TaskLink>
        </Container>
        <Container className={styles.firstTaskContainer}>
          <h1>grseg</h1>
        </Container>
    </Main>
  );
};

export default Tasks;
