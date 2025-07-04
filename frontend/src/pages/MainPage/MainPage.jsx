import styles from "./MainPage.module.css";
import Container from "../../components/Container/Container";
import Main from "../../components/Main/Main";

const MainPage = () => {
  return (
    <Main className={styles.mainAbout}> 
      <Container className={styles.mainContainer}>
        <Container className={styles.container}>
          <h2 className={styles.info}>What it is (insert description)</h2>
          <p className={styles.aboutinfo}>information</p>
        </Container>
        <Container className={styles.container}>
          <h2 className={styles.info}>Стек технологий</h2>
          <ul className={styles.list}>
            <li>Заполнить</li>
            <li>Заполнить</li>
            <li>Заполнить</li>
          </ul>
        </Container>
        <Container className={styles.container}>
          <p className={styles.info}>
            Ссылка на github автора -{" "}
            <a href="https://github.com/KatyaSoloveva">Github</a>
          </p>
        </Container>
      </Container>
      <Container className={styles.sideContainer}></Container>
    </Main>
  );
};

export default MainPage;
