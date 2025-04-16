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
  isImage,
  isColor,
  onClick,
}) => {
  const handleClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => (event) => {
    event.preventDefault();
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <Tool className={styles.dropdown}>
      <button
        type="button"
        className={styles.button}
        onClick={onClick || handleClick}
      >
        <span className={styles.buttonName}>{buttonName}</span>
        {!onClick && <img src={buttonImg} className={styles.panelImg}></img>}
      </button>
      {isOpen && (
        <div
          className={styles.dropdownMenu}
          style={isImage === "true" ? { minWidth: "120px" } : {}}
        >
          {isColor === "true" ? (
            <div className={styles.customContent}></div>
          ) : !items ? (
            <div></div>
          ) : (
            <ul className={styles.listContent}>
              {items.map((item) => (
                <li
                  key={item.label}
                  className={
                    isImage === "true" ? styles.liItemAlign : styles.liItem
                  }
                  onClick={handleItemClick(item)}
                >
                  {item.content}
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      )}
    </Tool>
  );
};

export default ButtonDropDown;
