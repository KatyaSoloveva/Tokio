import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import api from "../../api";
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );
    try {
      await api.updateMyProfile(filteredFormData);
      navigate("/mypage");
    } catch (error) {}
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

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              value={formData.username}
              onChange={onChange}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Имя </div>
            <Input
              label={user.first_name}
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={onChange}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Фамилия </div>
            <Input
              label={user.last_name}
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={onChange}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>День рождения </div>
            <Input
              label={user.birthday}
              name="birthday"
              type="text"
              value={formData.birthday}
              onChange={onChange}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.text}>Email </div>
            <Input
              label={user.email}
              name="email"
              type="text"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <Button type="submit">Редактировать профиль</Button>
        </Form>
      </Container>
    </Main>
  );
};

export default EditProfile;
