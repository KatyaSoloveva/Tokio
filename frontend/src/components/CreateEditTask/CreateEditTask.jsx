import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Container from "../Container/Container";
import InputDropDown from "../InputDropDown/InputDropDown";

const CreateEditTask = ({
  formClassName,
  editorClassName,
  buttonName,
  label1,
  label2,
  label3,
  initialText,
  initialCats,
  submitType,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    text: initialText,
    categories: initialCats,
  });
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [cats, setCats] = useState([]);
  const [catsIsOpen, setCatsIsOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await api.getCategories();
        setCats(categories);
      } catch (error) {}
    };
    fetchCategories();
  }, []);

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
      text: initialText,
      categories: initialCats,
    }));
    if (editor && initialText) {
      editor.commands.setContent(initialText);
    }
  }, [initialText, editor]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoriesToSend = formData.categories.map((cat) =>
      typeof cat === "object" ? cat.id : cat
    );
    if (submitType === "createTask") {
      try {
        const taskData = await api.createTask({
          name: formData.name,
          text: formData.text,
          categories: categoriesToSend,
        });
        navigate(`/tasks/${taskData.id}`);
      } catch (error) {
        setServerError("Ошибка при создании заметки.");
      }
    } else {
      try {
        const current = await api.getTask({ task_id: parseInt(id) });
        await api.updateTask({
          name: formData.name || current.name,
          text: formData.text,
          categories: categoriesToSend,
          task_id: parseInt(id),
        });
        navigate(`/tasks/${id}`, { state: { refresh: true } });
        setFormData((prev) => ({ ...prev, name: "" }));
      } catch (error) {
        console.log(error);
        setServerError("Ошибка при обновлении заметки.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  };

  const selectCat = (item) => {
    setFormData((prev) => {
      const currentCategories = prev.categories || [];
      const isItemSelected = currentCategories.some(
        (cat) => (typeof cat === "object" ? cat.id : cat) === item.id
      );
      if (isItemSelected) {
        return {
          ...prev,
          categories: currentCategories.filter(
            (cat) => (typeof cat === "object" ? cat.id : cat) !== item.id
          ),
        };
      } else {
        return {
          ...prev,
          categories: [
            ...currentCategories,
            submitType === "createTask" ? item.id : item,
          ],
        };
      }
    });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await api.deleteTask({ task_id: parseInt(id) });
      navigate("/tasks");
    } catch (error) {
      setServerError("Ошибка при удалении заметки.");
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        submitType={submitType}
        className={cn(formClassName, styles.formCreateTask)}
      >
        <Container className={styles.container}>
          <Input
            type="text"
            label={label1}
            name="name"
            value={formData.name}
            className2={styles.inputLabel}
            onChange={handleChange}
            error={serverError}
            style={serverError ? { outline: "solid" } : {}}
          ></Input>
          <Input
            type="text"
            label={label2}
            name="collaborator"
            className2={styles.inputLabel}
          ></Input>
          <InputDropDown
            type="text"
            label={label3}
            name="categories"
            className2={styles.inputLabel}
            items={cats}
            isOpen={catsIsOpen}
            setIsOpen={setCatsIsOpen}
            onSelect={selectCat}
            selectedItems={formData.categories || []}
          ></InputDropDown>
        </Container>
        <Panel editor={editor}></Panel>
        <EditorContent
          editor={editor}
          className={cn(editorClassName, styles.editor)}
        />
        <Button type="submit" className={styles.createTaskButton}>
          {buttonName}
        </Button>
        {submitType != "createTask" && (
          <Button
            type="submit"
            className={styles.createTaskButton}
            onClick={handleDelete}
          >
            Удалить заметку
          </Button>
        )}
      </Form>
    </>
  );
};

export default CreateEditTask;
