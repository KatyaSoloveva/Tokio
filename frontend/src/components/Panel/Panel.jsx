import styles from "./Panel.module.css";
import { useState } from "react";
import Container from "../Container/Container";
import Tool from "../Tool/Tool";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import down_arrow from "/down_arrow.svg";
import up_arrow from "/up_arrow.svg";
import {
  fontOptions,
  headingOptions,
  textAlignOptions,
  ListOptions,
} from "../../utils /noteOptions";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Panel = ({ editor }) => {
  const [styleIsOpen, setStyleIsOpen] = useState(false);
  const [fontIsOpen, setFontIsOpen] = useState(false);
  const [fontColorIsOpen, setFontColorIsOpen] = useState(false);
  const [backColorIsOpen, setBackColorIsOpen] = useState(false);
  const [textAlignIsOpen, setTextAlignIsOpen] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
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
    editor.chain().focus().setColor(color.hex).run();
  };

  const selectBackColor = (color) => {
    setBackColor(color);
    if (!editor) return;
    editor.chain().focus().setBackgroundColor(color.hex).run();
  };

  const selectTextAlign = (item) => {
    if (!editor) return;
    editor.chain().focus().setTextAlign(item.value).run();
  };

  const selectList = (item) => {
    if (!editor) return;
    else if (item.value === "ordered_list")
      editor.chain().focus().toggleOrderedList().run();
    else editor.chain().focus().toggleBulletList().run();
  };

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

  const textAlignItems = textAlignOptions.map((item) => {
    const content = <img src={item.label} className={styles.alignImage}></img>;
    return {
      ...item,
      content: content,
    };
  });

  const ListItems = ListOptions.map((item) => {
    const content = <img src={item.label} className={styles.alignImage}></img>;
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
        <ColorPicker
          color={fontColor}
          onChange={selectFontColor}
          hideInput={["hsv"]}
          height={100}
        />
      </ButtonDropDown>
      <ButtonDropDown
        buttonName="Цвет фона"
        isOpen={backColorIsOpen}
        setIsOpen={setBackColorIsOpen}
        buttonImg={backColorIsOpen ? up_arrow : down_arrow}
      >
        <ColorPicker
          color={backColor}
          onChange={selectBackColor}
          hideInput={["hsv"]}
          height={100}
        />
      </ButtonDropDown>
      <ButtonDropDown
        buttonName="Выравнивание"
        isOpen={textAlignIsOpen}
        setIsOpen={setTextAlignIsOpen}
        buttonImg={textAlignIsOpen ? up_arrow : down_arrow}
        items={textAlignItems}
        onSelect={selectTextAlign}
        isImage="true"
      />
      <ButtonDropDown
        buttonName="Списки"
        isOpen={listIsOpen}
        setIsOpen={setListIsOpen}
        buttonImg={listIsOpen ? up_arrow : down_arrow}
        items={ListItems}
        onSelect={selectList}
        isImage="true"
      />
      <Tool>two</Tool>
      <Tool>three</Tool>
      <Tool>four</Tool>
    </Container>
  );
};

export default Panel;
