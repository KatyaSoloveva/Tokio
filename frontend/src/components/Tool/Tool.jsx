import cn from "classnames";
import styles from "./Tool.module.css";

const Tool = ({ className, children }) => {
  return (
    <div className={cn(styles.tool, className)} dropdown="true">
      {children}
    </div>
  );
};

export default Tool;
