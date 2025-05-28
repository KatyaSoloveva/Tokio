import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import styles from "./MyPage.module.css";
import api from "../../api";
import UserCard from "../../components/UserCard/UserCard";
import Requests from "../../components/Requests/Requests";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [user, setuser] = useState([]);
  const [receivedColls, setReceivedColls] = useState([]);
  const [sentColls, setSentColls] = useState([]);
  const [receivedFriends, setReceivedFriends] = useState([]);
  const [sentFriends, setSentFriends] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.getMyPage();
        setuser(user);
      } catch (error) {}
    };
    fetchUser();
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

  const acceptColls = async (id) => {
    try {
      await api.respondCollaborations({ request_id: id, action: "accepted" });
      navigate(0);
    } catch (error) {}
  };

  const rejectColls = async (id) => {
    try {
      await api.respondCollaborations({ request_id: id, action: "rejected" });
      navigate(0);
    } catch (error) {}
  };

  const acceptFriendship = async (id) => {
    try {
      await api.respondFriendship({ request_id: id, action: "accepted" });
      navigate(0);
    } catch (error) {}
  };

  const rejectFriendship = async (id) => {
    try {
      await api.respondFriendship({ request_id: id, action: "rejected" });
      navigate(0);
    } catch (error) {}
  };

  const handleClick = (id) => async (event) => {
    event.preventDefault();
    try {
      await api.deleteFriend({ friend_id: id });
      navigate(0);
    } catch (error) {}
  };

  const onClick = (event) => {
    event.preventDefault()
    navigate("/edit_profile")
  }

  return (
    <Main>
      <Container className={styles.mainMyTasks}>
        <Container>
          <UserCard
            style={{ position: "relative" }}
            isUser
            image={user.avatar}
            username={user.username}
            name={user.first_name + " " + user.last_name}
            email={user.email}
            birthday={user.birthday}
          >
            <button
              type="button"
              className={styles.button}
              style={{ left: "auto", top: "auto" }}
              onClick={onClick}
            >
              Редактировать
            </button>
          </UserCard>
        </Container>
        <Container>
          <Input
            name="friends"
            label="Введите username"
            className={styles.friendsInput}
          />
          <div className={styles.friendUsercards}>
            {user?.friends?.map((friend) => (
              <div key={friend.id} style={{ position: "relative" }}>
                <UserCard
                  key={friend.id}
                  username={friend.username}
                  name={friend.first_name + " " + friend.last_name}
                  birthday={friend.birthday}
                ></UserCard>
                <button
                  type="button"
                  onClick={handleClick(friend.id)}
                  className={styles.button}
                >
                  Удалить
                </button>
              </div>
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
        onClickAccepted={acceptFriendship}
        onClickRejected={rejectFriendship}
      ></Requests>
      <hr />
      <Requests
        title="Запросы на сотрудничество"
        title1="Отправленные"
        title2="Полученные"
        items={receivedColls}
        items2={sentColls}
        onClickAccepted={acceptColls}
        onClickRejected={rejectColls}
      ></Requests>
    </Main>
  );
};

export default MyPage;
