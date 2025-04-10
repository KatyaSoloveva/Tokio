import styles from "./Panel.module.css";
import { useState } from "react";
import Container from "../Container/Container";
import Tool from "../Tool/Tool";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import down_arrow from "/down_arrow.svg";
import up_arrow from "/up_arrow.svg";
import { fontOptions, headingOptions } from "../../utils /noteOptions";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Panel = ({ editor }) => {
  const [styleIsOpen, setStyleIsOpen] = useState(false);
  const [fontIsOpen, setFontIsOpen] = useState(false);
  const [fontColorIsOpen, setFontColorIsOpen] = useState(false);
  const [backColorIsOpen, setBackColorIsOpen] = useState(false)
  const [fontColor, setFontColor] = useColor("");
  const [backColor, setBackColor] = useColor("");

  const selectStyle = (item) => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: item.level }).run();
  };

  const selectFont = (item) => {
    if (!editor) return;
    editor.chain().focus().setFontFamily(item.value).run();
  };

  const selectFontColor = (color) => {
    setFontColor(color);
    if (!editor) return;
    editor.chain().focus().setColor(color.hex).run()
  }

  const selectBackColor = (color) => {
    setBackColor(color);
    if (!editor) return;
    editor.chain().focus().setBackgroundColor(color.hex).run()

  }

  const fontDropdownItems = fontOptions.map((item) => {
    const content = <div style={{ fontFamily: item.value }}>{item.label}</div>;
    return {
      ...item,
      content: content,
    };
  });

  const styleDropdownItems = headingOptions.map((item) => {
    const content = <div style={item.value}>{item.label}</div>;
    return {
      ...item,
      content: content,
    };
  });

  return (
    <Container className={styles.panel}>
      <ButtonDropDown
        buttonName="Стиль"
        isOpen={styleIsOpen}
        setIsOpen={setStyleIsOpen}
        buttonImg={styleIsOpen ? up_arrow : down_arrow}
        items={styleDropdownItems}
        onSelect={selectStyle}
      />
      <ButtonDropDown
        buttonName="Шрифт"
        isOpen={fontIsOpen}
        setIsOpen={setFontIsOpen}
        buttonImg={fontIsOpen ? up_arrow : down_arrow}
        items={fontDropdownItems}
        onSelect={selectFont}
      />
      <ButtonDropDown
        buttonName="Цвет шрифта"
        isOpen={fontColorIsOpen}
        setIsOpen={setFontColorIsOpen}
        buttonImg={fontColorIsOpen ? up_arrow : down_arrow}
      >
        <ColorPicker color={fontColor} onChange={selectFontColor} hideInput={["hsv"]} height={100} />
      </ButtonDropDown>
      <ButtonDropDown
        buttonName="Цвет фона"
        isOpen={backColorIsOpen}
        setIsOpen={setBackColorIsOpen}
        buttonImg={backColorIsOpen ? up_arrow : down_arrow}
      >
        <ColorPicker color={backColor} onChange={selectBackColor} hideInput={["hsv"]} height={100} />
      </ButtonDropDown>
      <Tool>one</Tool>
      <Tool>two</Tool>
      <Tool>three</Tool>
      <Tool>four</Tool>
    </Container>
  );
};

export default Panel;
