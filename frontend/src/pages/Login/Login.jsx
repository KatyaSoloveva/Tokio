import { useContext, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (event) => {
    if (handleSubmit(event)) {
      try {
        const userData = await api.signin({
          email: formData.email,
          password: formData.password,
        });
        login(userData.auth_token);
        navigate("/");
      } catch (error) {
        setServerError("Неверный email или пароль!");
      }
    } else {
      console.log("mistakes in  the form");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onChange = (event) => {
    handleChange(event)
    setServerError("")
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormTitle title="Войти" />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email || serverError}
          style={errors.email || serverError ? {outline: "solid"} : {}}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          error={errors.password}
          style={errors.password || serverError ? {outline: "solid"} : {}}
        />
        <Button type="submit">Войти</Button>
      </Form>
    </>
  );
};

export default Login;
