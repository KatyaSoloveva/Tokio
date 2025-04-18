import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import errorMessages from "../../utils /errorMessages";

const Registration = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState({});

  const navigate = useNavigate();

  const handleServerError = (error) => {
    const serverErrors = {};
    Object.keys(error.error).forEach((key) => {
      const error_key = key;
      const error_message = errorMessages["registration"][error_key];
      serverErrors[key] = error_message;
    });
    return serverErrors;
  };

  const onSubmit = async (event) => {
    if (handleSubmit(event)) {
      try {
        await api.signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        navigate("/login");
      } catch (error) {
        console.log("Error:", error);
        if (errorMessages["general"][error.status]) {
          setServerError({ general: errorMessages["general"][error.status] });
        } else {
          setServerError(handleServerError(error));
        }
      }
    }
  };

  const onChange = (event) => {
    handleChange(event);
    setServerError((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  return (
    <Main withBG>
      <Container>
        <Form onSubmit={onSubmit}>
          <FormTitle title="Регистрация" />
          <Input
            label="Логин"
            name="username"
            value={formData.username}
            onChange={onChange}
            error={
              errors.username || serverError.general || serverError.username
            }
            style={
              errors.username || serverError.username
                ? { outline: "solid" }
                : {}
            }
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email || serverError.email}
            style={
              errors.email || serverError.email ? { outline: "solid" } : {}
            }
          />

          <Input
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            error={errors.password || serverError.password}
            style={
              errors.password || serverError.password
                ? { outline: "solid" }
                : {}
            }
          />

          <Button type="submit">Создать аккаунт</Button>
        </Form>
      </Container>
    </Main>
  );
};

export default Registration;
