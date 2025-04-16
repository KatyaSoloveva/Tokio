import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./CreateEditTask.module.css";
import api from "../../api";
import Panel from "../../components/Panel/Panel";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Color } from "@tiptap/extension-color";
import { BackgroundColor } from "../../../tiptap-extension/src/BackgroundColorExtension";

const CreateEditTask = ({
  formClassName,
  inputClassName,
  editorClassName,
  buttonName,
  label,
  initialContent,
}) => {
  const [formData, setFormData] = useState({ name: "", text: initialContent });
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Color,
      BackgroundColor,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: formData.text,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        text: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      text: initialContent,
    }));
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.createTask({
        name: formData.name,
        text: formData.text,
      });
      navigate("/");
    } catch (error) {
      setServerError("Заметка с таким названием уже существует!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className={cn(formClassName, styles.formCreateTask)}
      >
        <Input
          type="text"
          label={label}
          name="name"
          value={formData.name}
          className={cn(inputClassName, styles.inputName)}
          onChange={handleChange}
          error={serverError}
          style={serverError ? { outline: "solid" } : {}}
        ></Input>
        <Panel editor={editor}></Panel>
        <EditorContent
          editor={editor}
          className={cn(editorClassName, styles.editor)}
        />
        <Button type="submit">{buttonName}</Button>
      </Form>
    </>
  );
};

export default CreateEditTask;
