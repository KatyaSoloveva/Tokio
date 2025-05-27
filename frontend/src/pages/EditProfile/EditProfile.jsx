import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import api from "../../api";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const [user, setuser] = useState([]);
  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const user = await api.getMyPage();
        setuser(user);
      } catch (error) {}
    };
    fetchMyPage();
  }, []);

  const [formData, setFormData] = useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    birthday: user.birthday,
    email: user.email
  });

  return (
    <Main withBG>
      <Container>
        <Form onSubmit={onSubmit}>
          <FormTitle title="Мой профиль" />
          <div className={styles.item}>
            <div className={styles.text}>Username </div>
            <Input
              label={user.username}
              name="username"
              type="text"
            />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Имя </div>
            <Input label={user.first_name} name="first_name" type="text" />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Фамилия </div>
            <Input label={user.last_name} name="last_name" type="text" />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>День рождения </div>
            <Input label={user.birthday} name="birthday" type="text" />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Email </div>
            <Input label={user.email} name="email" type="text" />
          </div>
          <Button type="submit">Редактировать профиль</Button>
        </Form>
      </Container>
    </Main>
  );
};

export default EditProfile;
