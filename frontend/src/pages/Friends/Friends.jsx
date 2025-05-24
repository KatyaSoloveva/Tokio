import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./Friends.module.css";

const Friends = () => {
  return (
    <Main>
      <Container>
        <Input name="friends" label="Введите username" className={styles.friendsInput} />
      </Container>
    </Main>
  );
};

export default Friends;
