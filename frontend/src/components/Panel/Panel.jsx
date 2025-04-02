import styles from "./Panel.module.css";
import { useState } from "react";
import Container from "../Container/Container";
import Tool from "../Tool/Tool";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import down_arrow from "/down_arrow.svg";
import up_arrow from "/up_arrow.svg";
import { fontOptions, headingOptions } from "../../utils /noteOptions";

const Panel = () => {
  const styleDropdownItems = headingOptions.map((item) => {
    const content = <div style={item.value}>{item.label}</div>;
    return {
      ...item,
      content: content,
    };
  });

  const fontDropdownItems = fontOptions.map((item) => {
    const content = <div style={{ fontFamily: item.value }}>{item.label}</div>;
    return {
      ...item,
      content: content,
    };
  });

  const [styleIsOpen, setStyleIsOpen] = useState(false);
  const [fontIsOpen, setFontIsOpen] = useState(false);
  return (
    <Container className={styles.panel}>
      <ButtonDropDown
        buttonName="Стиль"
        isOpen={styleIsOpen}
        setIsOpen={setStyleIsOpen}
        buttonImg={styleIsOpen ? up_arrow : down_arrow}
        items={styleDropdownItems}
      ></ButtonDropDown>
      <ButtonDropDown
        buttonName="Шрифт"
        isOpen={fontIsOpen}
        setIsOpen={setFontIsOpen}
        buttonImg={fontIsOpen ? up_arrow : down_arrow}
        items={fontDropdownItems}
      ></ButtonDropDown>
      <Tool>one</Tool>
      <Tool>two</Tool>
      <Tool>three</Tool>
      <Tool>four</Tool>
    </Container>
  );
};

export default Panel;
