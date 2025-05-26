import Container from "../Container/Container";
import FormTitle from "../FormTitle/FormTitle";
import styles from "./Requests.module.css";

const Requests = ({ title, child1, child2 }) => {
  return (
    <Container>
      <FormTitle title={title}></FormTitle>
      <Container className={styles.mainMyTasks}>
        <Container>{child1}</Container>
        <Container>{child2}</Container>
      </Container>
    </Container>
  );
};

export default Requests;
