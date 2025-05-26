import Container from "../Container/Container";
import FormTitle from "../FormTitle/FormTitle";
import styles from "./Requests.module.css";

const Requests = ({ title, child1, child2 }) => {
  return (
    <Container>
      <FormTitle title={title}></FormTitle>
      <Container className={styles.mainMyTasks}>
        <Container className={styles.requestContainer}>{child1}</Container>
        <Container className={styles.requestContainer}>{child2}</Container>
      </Container>
    </Container>
  );
};

export default Requests;
