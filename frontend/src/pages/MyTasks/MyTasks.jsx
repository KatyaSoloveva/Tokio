import { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";
import TaskLink from "../../components/TaskLink/TaskLink";
import TaskDetail from "../../components/TaskDetail/TaskDetail";
import api from "../../api";
import styles from "./MyTasks.module.css";

const MyTasks = () => {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getMyTasks();
        setData(tasks);
      } catch (error) {}
    };
    fetchTasks();
  }, []);

  const handleTaskClick = (taskData) => {
    setSelectedTask(taskData);
  };

  console.log("f", selectedTask);
  return (
    <Main className={styles.mainMyTasks}>
      <Container className={styles.tasksContainer}>
        <TaskLink tasks={data} onTaskClick={handleTaskClick}></TaskLink>
      </Container>
      <Container className={styles.firstTaskContainer}>
        <TaskDetail data={selectedTask}></TaskDetail>
      </Container>
    </Main>
  );
};

export default MyTasks;
