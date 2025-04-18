import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";
import TaskLink from "../../components/TaskLink/TaskLink";
import TaskDetail from "../../components/TaskDetail/TaskDetail";
import api from "../../api";
import styles from "./MyTasks.module.css";
import Input from "../../components/Input/Input";

const MyTasks = () => {
  const [data, setData] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getMyTasks();
        setData(tasks);
      } catch (error) {}
    };
    fetchTasks();
  }, [id]);

  useEffect(() => {
    if (location.state?.refresh) {
      const fetchTasks = async () => {
        try {
          const tasks = await api.getMyTasks();
          setData(tasks);
        } catch (error) {}
      };
      fetchTasks();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  return (
    <Main className={styles.mainMyTasks}>
      {data.length > 0 ? (
        <>
          {!isHidden && (
            <Container className={styles.tasksContainer}>
              <Input
                type="text"
                name="search"
                label="Заметка"
                className={styles.searchInput}
              />
              <TaskLink tasks={data}></TaskLink>
            </Container>
          )}
          <Container className={!isHidden && styles.firstTaskContainerFull}>
            {id ? (
              <TaskDetail
                data={data.find((task) => task.id === parseInt(id))}
              />
            ) : (
              <div>Выберите задачу из списка(потом сделать страницу норм)</div>
            )}
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
