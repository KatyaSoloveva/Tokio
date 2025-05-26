import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./MyPage.module.css";
import api from "../../api";
import UserCard from "../../components/UserCard/UserCard";
import Requests from "../../components/Requests/Requests";

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
    <Main>
      <Container className={styles.mainMyTasks}>
        <Container>
          <UserCard
            isUser
            image={user.avatar}
            username={user.username}
            name={user.first_name + " " + user.last_name}
            email={user.email}
            birthday={user.birthday}
          ></UserCard>
        </Container>
        <Container>
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
      </Container>
      <hr/>
      <Requests title="Заявки в друзья" child1="Отправленные" child2="Полученные"></Requests>
      <hr/>
      <Requests title="Запросы на сотрудничество" child1="Отправленные" child2="Полученные"></Requests>
    </Main>
  );
};

export default MyPage;
