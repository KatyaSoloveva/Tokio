import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState({});

  const navigate = useNavigate();

  const messages = {
    username: "Пользователь с таким логином уже существует!",
    email: "Пользователь с таким email уже существует!",
    password: "Пароль слишком похож на username!",
  };

  useEffect(() => {
    console.log(formData), [formData];
  });

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
        Object.keys(error).forEach((key) => {
          const error_key = key;
          console.log(error_key);
          const error_message = messages[error_key];
          setServerError((prev) => ({ ...prev, [error_key]: error_message }));
        });
      }
    }
  };

  const onChange = (event) => {
    handleChange(event);
    setServerError((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormTitle title="Регистрация" />
        <Input
          label="Логин"
          name="username"
          value={formData.username}
          onChange={onChange}
          error={errors.username || serverError.username}
          style={errors.username || serverError.username ? {outline: "solid"} : {}}
        />

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email || serverError.email}
          style={errors.email || serverError.email ? {outline: "solid"} : {}}
        />

        <Input
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          error={errors.password || serverError.password}
          style={errors.password || serverError.password ? {outline: "solid"} : {}}
        />

        <Button type="submit">Создать аккаунт</Button>
      </Form>
    </>
  );
};

export default Registration;
