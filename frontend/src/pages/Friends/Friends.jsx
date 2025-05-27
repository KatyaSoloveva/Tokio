import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./Friends.module.css";
import api from "../../api";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await api.getFriends();
        setFriends(friends.friends)
      } catch (error) {}
    };
    fetchFriends();
  }, []);

  return (
    <Main>
      <Container>
        <Input
          name="friends"
          label="Введите username"
          className={styles.friendsInput}
        />
        <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                {friend.username}
              </li>
            ))}
          </ul>
      </Container>
    </Main>
  );
};

export default Friends;
