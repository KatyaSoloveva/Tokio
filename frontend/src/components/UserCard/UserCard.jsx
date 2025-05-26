import Container from "../Container/Container";
import styles from "./UserCard.module.css";
import anonim from "/avatar_anonim.png";

const UserCard = ({ image, username, name, birthday, email, isUser, children }) => {
  return (
    <Container className={styles.usercardContainer}>
      <img src={image || anonim} className={styles.image} />
      <Container
        className={styles.infoContainer}
        style={isUser ? { gridTemplateColumns: "1fr 1fr 1fr" } : {}}
      >
        <div
          className={styles.info}
          style={{
            fontSize: "2.5rem",
            gridColumn: 1,
            gridRow: 1,
            textAlign: "left",
          }}
        >
          {username}
        </div>
        <div className={styles.info} style={{ gridColumn: 1, gridRow: 2 }}>
          {null ? name : "Анонимный Аноним"}
        </div>
        <div className={styles.info} style={{ gridColumn: 2, gridRow: 2 }}>
          {birthday}
        </div>
        {isUser && (
          <div className={styles.info} style={{ gridColumn: 3, gridRow: 2 }}>
            {email}
          </div>
        )}
      </Container>
      {children}
    </Container>
  );
};

export default UserCard;
