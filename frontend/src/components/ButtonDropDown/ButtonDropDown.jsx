import styles from "./ButtonDropDown.module.css";
import Tool from "../Tool/Tool";

const ButtonDropDown = ({
  buttonName,
  buttonImg,
  isOpen,
  setIsOpen,
  items,
  onSelect,
  children,
}) => {
  const handleClick = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    onSelect(item);
  };

  return (
    <Tool className={styles.dropdown}>
      <button type="button" className={styles.button} onClick={handleClick}>
        <span className={styles.buttonName}>{buttonName}</span>
        <img src={buttonImg} className={styles.panelImg}></img>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children ? (
            <div className={styles.customContent}>{children}</div>
          ) : (
            <ul className={styles.listContent}>
              {items.map((item) => (
                <li
                  key={item.label}
                  className={styles.liItem}
                  onClick={handleItemClick(item)}
                >
                  {item.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Tool>
  );
};

export default ButtonDropDown;

// {isOpen && (
//   <ul className={styles.dropdownMenu}>
//     {items.map((item) => (
//       <li
//         key={item.label}
//         className={styles.liItem}
//         onClick={handleItemClick(item)}
//       >
//         {item.content}
//       </li>
//     ))}
//   </ul>
// )}
