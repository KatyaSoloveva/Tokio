import Container from "../../components/Container/Container";
import CreateEditTask from "../../components/CreateEditTask/CreateEditTask";
import Main from "../../components/Main/Main";

const CreateTask = () => {
  return (
    <Main withBG>
      <Container>
        <CreateEditTask buttonName="Создать заметку" label="Заметка"></CreateEditTask>
      </Container>
    </Main>
  );
};

export default CreateTask;
