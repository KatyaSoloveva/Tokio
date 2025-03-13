import cn from 'classnames'
import styles from "./FormTitle.module.css"

const FormTitle = ({ className, title }) => {
  return <h4 className={cn(styles.formTitle, className)}>{title}</h4>;
};

export default FormTitle