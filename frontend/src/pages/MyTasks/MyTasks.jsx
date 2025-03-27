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
  const [isHidden, setIsHidden] = useState(false);

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
    localStorage.setItem("selectedTask", JSON.stringify(taskData));
  };
  console.log(isHidden);
  return (
    <Main className={styles.mainMyTasks}>
      {data.length > 0 ? (
        <>
          {!isHidden && (
            <Container className={styles.tasksContainer}>
              <TaskLink tasks={data} onTaskClick={handleTaskClick}></TaskLink>
            </Container>
          )}
          <Container
            className={
              isHidden
                ? styles.firstTaskContainerFull
                : styles.firstTaskContainer
            }
          >
            <TaskDetail
              data={
                localStorage.getItem("selectedTask")
                  ? JSON.parse(localStorage.getItem("selectedTask"))
                  : selectedTask
              }
            ></TaskDetail>
          </Container>
          <button
            onClick={() => {
              setIsHidden(!isHidden);
            }}
            className={styles.button}
            style={isHidden ? { left: "0" } : {}}
          ></button>
        </>
      ) : (
        <h1>Тут пусто (потом сделать страницу норм)</h1>
      )}
    </Main>
  );
};

export default MyTasks;
