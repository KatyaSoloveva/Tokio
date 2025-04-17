import styles from "./Panel.module.css";
import { useState, useEffect } from "react";
import Container from "../Container/Container";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import down_arrow from "/down_arrow.svg";
import up_arrow from "/up_arrow.svg";
import {
  fontOptions,
  headingOptions,
  textAlignOptions,
  ListOptions,
  tableOptions,
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
  const [coords, setCoords] = useState(null);
  const [selectedCellPos, setSelectedCellPos] = useState(null);

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

  const handleClickTable = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const handleClickEditTable = (action) => {
    if (!editor) return;
    const actions = {
      addColumnBefore: () => editor.chain().focus().addColumnBefore().run(),
      addColumnAfter: () => editor.chain().focus().addColumnAfter().run(),
      deleteColumn: () => editor.chain().focus().deleteColumn().run(),
      addRowBefore: () => editor.chain().focus().addRowBefore().run(),
      addRowAfter: () => editor.chain().focus().addRowAfter().run(),
      deleteRow: () => editor.chain().focus().deleteRow().run(),
      deleteTable: () => editor.chain().focus().deleteTable().run(),
    };

    actions[action]();
  };

  useEffect(() => {
    if (!editor) return;

    const updatePosition = () => {
      const { $from } = editor.state.selection;
      const tableCellNode = $from.node(-1);
      if (
        tableCellNode !== undefined &&
        tableCellNode.type.name === "tableCell"
      ) {
        const position = $from.posAtIndex(0);
        if (position != selectedCellPos) {
          const pos = editor.view.coordsAtPos(position);
          setCoords({ top: pos.top + 15, left: pos.left });
          setSelectedCellPos(position);
        }
      } else {
        setCoords(null);
      }
    };
    editor.on("selectionUpdate", updatePosition);
    return () => {
      editor.off("selectionUpdate", updatePosition);
    };
  }, [editor, selectedCellPos]);

  useEffect(() => {
    const handleFloating = () => {
      setCoords(false);
    };

    document.addEventListener("keyup", handleFloating);
    document.addEventListener("keydown", handleFloating);
    return () => {
      document.removeEventListener("keyup", handleFloating);
      document.removeEventListener("keydown", handleFloating);
    };
  }, [coords]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isAnyOpen =
        styleIsOpen ||
        fontIsOpen ||
        fontColorIsOpen ||
        backColorIsOpen ||
        textAlignIsOpen ||
        listIsOpen;
      if (!isAnyOpen) return;
      const isInside = event.target.closest('[dropdown="true"]');
      if (!isInside) {
        setStyleIsOpen(false);
        setFontIsOpen(false);
        setFontColorIsOpen(false);
        setBackColorIsOpen(false);
        setTextAlignIsOpen(false);
        setListIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [
    styleIsOpen,
    fontIsOpen,
    fontColorIsOpen,
    backColorIsOpen,
    textAlignIsOpen,
    listIsOpen,
  ]);

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
        isColor="true"
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
        isColor="true"
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
      <ButtonDropDown buttonName="Таблица" onClick={handleClickTable} />
      {coords && (
        <div
          className={styles.floating}
          style={{
            position: "absolute",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {tableOptions.map((item) => (
            <button
              key={item.alt}
              type="button"
              style={{ display: "inline-block" }}
              // onClick={() => handleClickEditTable(item.action)}
              onClick={(e) => {
                e.stopPropagation();
                handleClickEditTable(item.action);
              }}
            >
              <img
                src={item.img}
                alt={item.alt}
                className={styles.imageForTable}
              ></img>
            </button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Panel;
