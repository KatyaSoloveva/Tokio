import Input from "../Input/Input";
import styles from "./InputDropDown.module.css";
import trash_bin from "/trash_bin.svg";

const InputDropDown = ({
  type,
  label,
  name,
  className2,
  items,
  isOpen,
  setIsOpen,
  onSelect,
  selectedItems,
}) => {
  const handleClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleItemClick = (item) => (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    onSelect(item);
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        type={type}
        label={label}
        name={name}
        className2={className2}
        onClick={handleClick}
      ></Input>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul className={styles.listContent}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <li className={styles.liItem} onClick={handleItemClick(item)}>
                  {item.name}
                </li>
                {selectedItems.some(
                  (cat) => (typeof cat === "object" ? cat.id : cat) === item.id
                ) && (
                  <img
                    src={trash_bin}
                    alt="Удалить"
                    style={{ width: "16px", height: "16px", marginLeft: "5px" }}
                  />
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputDropDown;
