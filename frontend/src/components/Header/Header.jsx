import styles from "./Header.module.css";
import logo from "/nusya2.png";
import LinkComponent from "../Link/Link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <div
        className={styles.headerContent}
        style={isAuthenticated ? { gridTemplateColumns: "1fr 2fr 1fr" } : {}}
      >
        <LinkComponent to="/" className={styles.link}>
          <img className={styles.headerLogo} src={logo} alt="Tokio" />
        </LinkComponent>
        <div className={isAuthenticated ? styles.nav2 : styles.nav}>
          <LinkComponent
            to="/opportunities"
            className={styles.link}
            activeClassName={styles.link_active}
          >
            Возможности
          </LinkComponent>
          <LinkComponent
            to="/about"
            className={styles.link}
            activeClassName={styles.link_active}
          >
            О проекте
          </LinkComponent>
          {isAuthenticated && (
            <LinkComponent
              to="/tasks"
              className={styles.link}
              activeClassName={styles.link_active}
            >
              Мои заметки
            </LinkComponent>
          )}
        </div>
        <div className={styles.nav}>
          {isAuthenticated ? (
            <LinkComponent
              to="/"
              className={styles.link}
              onClick={handleLogout}
            >
              Выйти
            </LinkComponent>
          ) : (
            <>
              <LinkComponent
                to="/login"
                className={styles.link}
                activeClassName={styles.link_active}
              >
                Войти
              </LinkComponent>
              <LinkComponent
                to="/register"
                className={styles.link}
                activeClassName={styles.link_active}
              >
                Зарегистрироваться
              </LinkComponent>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
