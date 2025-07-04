import { useContext, useState } from "react";
import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Container from "../../components/Container/Container";
import errorMessages from "../../utils /errorMessages";

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
        setServerError(
          errorMessages["general"][error.status] ||
            errorMessages["login"][error.status] ||
            errorMessages["login"]["undefined"]
        );
      }
    } else {
      console.log("mistakes in  the form");
    }
  };

  const onChange = (event) => {
    handleChange(event);
    setServerError("");
  };

  return (
    <Main withBG>
      <Container>
        <Form onSubmit={onSubmit}>
          <FormTitle title="Войти" />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email || serverError}
            style={errors.email || serverError ? { outline: "solid" } : {}}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            error={errors.password}
            style={errors.password || serverError ? { outline: "solid" } : {}}
          />
          <Button type="submit">Войти</Button>
        </Form>
      </Container>
    </Main>
  );
};

export default Login;
