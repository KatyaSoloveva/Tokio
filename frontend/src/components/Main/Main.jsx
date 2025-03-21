import cn from "classnames";
import styles from "./Main.module.css";

const Main = ({ children, withBG, className }) => {
  return (
    <main className={cn(styles.main, className, { [styles.withBG]: withBG })}>
      {children}
    </main>
  );
};

export default Main;
