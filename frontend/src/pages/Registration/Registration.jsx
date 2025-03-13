import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";

const Registration = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    login: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log(formData), [formData];
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormTitle title="Регистрация" />
        <Input
          label="Логин"
          name="login"
          value={formData.login}
          onChange={handleChange}
          error={errors.login}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Пароль"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit">Создать аккаунт</Button>
      </Form>
    </>
  );
};

export default Registration;
