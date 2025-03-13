import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from "./Link.module.css";

const LinkComponent = ({ to, className, activeClassName, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname == to;
  return (
    <NavLink
      to={to}
      className={cn(styles.link, className, { [activeClassName]: isActive })}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export default LinkComponent;
