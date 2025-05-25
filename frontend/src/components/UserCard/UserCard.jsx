import Container from "../Container/Container";
import styles from "./UserCard.module.css";

const UserCard = ({ image, username, name, birthday, email }) => {
  return (
    <Container className={styles.usercardContainer}>
      <img src={image} className={styles.image} />
      <Container className={styles.infoContainer}>
        <div
          className={styles.info}
          style={{ fontSize: "2.5rem", gridColumn: 1, gridRow: 1, textAlign: "left" }}
        >
          {username}
        </div>
        <div className={styles.info} style={{ gridColumn: 1, gridRow: 2 }}>
          {null ? name : "Анонимный Аноним"}
        </div>
        <div className={styles.info} style={{ gridColumn: 2, gridRow: 2 }}>
          {email}
        </div>
        <div className={styles.info} style={{ gridColumn: 3, gridRow: 2 }}>
          {birthday}
        </div>
      </Container>
    </Container>
  );
};

export default UserCard;
