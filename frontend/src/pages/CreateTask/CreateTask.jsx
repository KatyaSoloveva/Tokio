import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./CreateTask.module.css";
import Main from "../../components/Main/Main";
import api from "../../api";
import Panel from "../../components/Panel/Panel";

const CreateTask = () => {
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [serverError, setServerError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.createTask({
        name: formData.name,
        text: formData.text,
      });
      navigate("/");
    } catch (error) {
      setServerError("Заметка с таким названием уже существует!")
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("")
  };

  return (
    <Main withBG>
      <Container>
        <Form onSubmit={handleSubmit} className={styles.formCreateTask}>
          <Input
            label="Заметка"
            name="name"
            value={formData.name}
            className={styles.inputName}
            onChange={handleChange}
            error={serverError}
            style={serverError ? { outline: "solid" } : {}}
          ></Input>
          <Panel></Panel>
          <Input
            label="Текст"
            name="text"
            value={formData.text}
            className={styles.inputText}
            fieldType="textarea"
            onChange={handleChange}
          ></Input>
          <Button type="submit">Создать заметку</Button>
        </Form>
      </Container>
    </Main>
  );
};

export default CreateTask;
