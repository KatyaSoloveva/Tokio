import cn from "classnames";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = ({
  className,
  className2,
  label,
  type,
  name,
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <label htmlFor={name} className={cn(className2, styles.inputLabel)}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={label}
        className={cn(styles.input, className)}
        onChange={onChange}
        value={value}
        {...props}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;

