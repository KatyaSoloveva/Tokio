import cn from "classnames";
import styles from "./Form.module.css";

const Form = ({ className, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={cn(styles.form, className)}>
      {children}
    </form>
  );
};

export default Form;
