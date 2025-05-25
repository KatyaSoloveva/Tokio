import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./MyPage.module.css";
import api from "../../api";

const MyPage = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await api.getFriends();
        console.log(friends);
        setFriends(friends);
      } catch (error) {}
    };
    fetchFriends();
  }, []);

  return (
    <Main className={styles.mainMyTasks}>
      <Container className={styles.bio}>
        <h1>bio</h1>
      </Container>
      <Container className={styles.friends}>
        <Input
          name="friends"
          label="Введите username"
          className={styles.friendsInput}
        />
        {/* <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.username}</li>
          ))}
        </ul> */}
      </Container>
      <Container className={styles.requests}>
        <h1>requests</h1>
      </Container>
    </Main>
  );
};

export default MyPage;
