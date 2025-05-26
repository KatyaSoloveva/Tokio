import Container from "../Container/Container";
import FormTitle from "../FormTitle/FormTitle";
import LinkComponent from "../Link/Link";
import styles from "./Requests.module.css";

const Requests = ({ title, title1, title2, items, items2 }) => {
  items?.map((item) => console.log(item.request_date));
  return (
    <Container>
      <FormTitle title={title}></FormTitle>
      <Container className={styles.mainMyTasks}>
        <Container>
          <div className={styles.requestContainer}>{title1}</div>
          <div className={styles.boxesContainer}>
            {items2 ? (
              <>
                {items2.map((item) => (
                  <div key={item.id} className={styles.box}>
                    <div className={styles.boxItem}>
                      Получатель: {item.receiver}
                    </div>
                    <div className={styles.boxItem}>
                      Заметка:{" "}
                      <LinkComponent
                        to={`/tasks/${item.task.id}`}
                        className={styles.link}
                      >
                        {item.task.name}
                      </LinkComponent>
                    </div>
                    <div className={styles.boxItem}>Статус: {item.status}</div>
                    <div className={styles.boxItem}>
                      Дата: {item.request_date}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1>wiil fixed</h1>
            )}
          </div>
        </Container>
        <Container>
          <div className={styles.requestContainer}>{title2}</div>
          <div className={styles.boxesContainer}>
            {items ? (
              <>
                {items.map((item) => (
                  <div key={item.id} className={styles.box}>
                    <div className={styles.boxItem}>
                      Отправитель: {item.sender}
                    </div>
                    <div className={styles.boxItem}>
                      Заметка:{" "}
                      <LinkComponent
                        to={`/tasks/${item.task.id}`}
                        className={styles.link}
                      >
                        {item.task.name}
                      </LinkComponent>
                    </div>
                    <div className={styles.boxItem}>Статус: {item.status}</div>
                    <div className={styles.boxItem}>
                      Дата: {item.request_date}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1>Потом исправить</h1>
            )}
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Requests;
