import Container from "../../components/Container/Container";
import CreateEditTask from "../../components/CreateEditTask/CreateEditTask";
import Main from "../../components/Main/Main";

const CreateTask = () => {
  return (
    <Main withBG>
      <Container>
        <CreateEditTask buttonName="Создать заметку" label1="Заметка" label2="Выбор коллаборатора" submitType="createTask"></CreateEditTask>
      </Container>
    </Main>
  );
};

export default CreateTask;
