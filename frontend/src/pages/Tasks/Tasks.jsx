import { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";
import api from "../../api";

const Tasks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getTasks();
        setData(tasks);
      } catch (err) {}
    };
    fetchTasks();
  }, []);

  return (
    <Main>
      <Container>
        <div>
          {data.map((task) => (
            <div key={task.id}>{task.name}</div>
          ))}
        </div>
      </Container>
    </Main>
  );
};

export default Tasks;
