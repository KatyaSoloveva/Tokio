import { useContext, useEffect } from "react";
import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    if (handleSubmit(event)) {
      console.log("handleSubmit is running: Ready to go to server");
      login();
      navigate("/");
    } else {
      console.log("cant");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormTitle title="Войти" />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit">Войти</Button>
      </Form>
    </>
  );
};

export default Login;
