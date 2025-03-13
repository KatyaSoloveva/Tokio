import cn from "classnames";
import styles from "./Button.module.css";

const Button = ({ type, className, disabled, onClick, children }) => {

  return (
    <button
      type={type}
      className={cn(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
