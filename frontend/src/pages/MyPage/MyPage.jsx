import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./MyPage.module.css";
import api from "../../api";
import UserCard from "../../components/UserCard/UserCard";

const MyPage = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const user = await api.getFriends();
        setuser(user);
      } catch (error) {}
    };
    fetchFriends();
  }, []);

  return (
    <Main className={styles.mainMyTasks}>
      <Container className={styles.bio}>
        <UserCard isUser
          image={user.avatar}
          username={user.username}
          name={user.first_name + " " + user.last_name}
          email={user.email}
          birthday={user.birthday}
        ></UserCard>
      </Container>
      <Container className={styles.friends}>
        <Input
          name="friends"
          label="Введите username"
          className={styles.friendsInput}
        />
        <div className={styles.friendUsercards}>
          {user?.friends?.map((friend) => (
            <UserCard
              key={friend.id}
              username={friend.username}
              name={friend.first_name + " " + friend.last_name}
              birthday={friend.birthday}
            ></UserCard>
          ))}
        </div>
      </Container>
      <Container className={styles.requests}>
        <h1>requests</h1>
      </Container>
    </Main>
  );
};

export default MyPage;
