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
  const [receivedColls, setReceivedColls] = useState([]);
  const [sentColls, setSentColls] = useState([]);
  const [receivedFriends, setReceivedFriends] = useState([]);
  const [sentFriends, setSentFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const user = await api.getFriends();
        setuser(user);
      } catch (error) {}
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const receivedColls = async () => {
      try {
        const collsRequests = await api.getReceivedCollaborations();
        setReceivedColls(collsRequests);
      } catch (error) {}
    };
    receivedColls();
  }, []);

  useEffect(() => {
    const sentColls = async () => {
      try {
        const collsRequests = await api.getSentCollaborations();
        setSentColls(collsRequests);
      } catch (error) {}
    };
    sentColls();
  }, []);

  useEffect(() => {
    const receivedFriends = async () => {
      try {
        const friendsRequests = await api.getReceivedFriendship();
        setReceivedFriends(friendsRequests);
      } catch (error) {}
    };
    receivedFriends();
  }, []);

    useEffect(() => {
    const sentFriends = async () => {
      try {
        const friendsRequests = await api.getSentFriendship();
        setSentFriends(friendsRequests);
      } catch (error) {}
    };
    sentFriends();
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
      <hr />
      <Requests
        title="Заявки в друзья"
        title1="Отправленные"
        title2="Полученные"
        items={receivedFriends}
        items2={sentFriends}
      ></Requests>
      <hr />
      <Requests
        title="Запросы на сотрудничество"
        title1="Отправленные"
        title2="Полученные"
        items={receivedColls}
        items2={sentColls}
      ></Requests>
    </Main>
  );
};

export default MyPage;
