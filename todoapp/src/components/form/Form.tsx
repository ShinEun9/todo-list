import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Form.module.css";
import buttonStyles from "../../styles/Button.module.css";

export type FormData = {
  title: string;
  content: string;
};

type Props = {
  onSubmit: (input: FormData) => Promise<void>;
};

const Form = ({ onSubmit: onParentSubmit }: Props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [input, setInput] = useState({ title: "", content: "" });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackBtnClick = () => {
    const confirm = window.confirm("취소 하시겠습니까?");
    if (!confirm) return;

    if (id) {
      navigate(`/detail/${id}`);
    } else {
      navigate("/");
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { title, content } = input;
    if (!title || !content) {
      alert("할일을 입력하세요^^");
      return;
    }

    onParentSubmit(input);
  };

  const getTodoData = async () => {
    try {
      const response = await axios.get<TodoResponse>(
        `${process.env.REACT_APP_BASE_URL}/todolist/${id}`
      );

      if (response.status === 200) {
        const todoData: TodoItem = response.data.item;
        setInput(todoData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTodoData();
    }
  }, []);

  return (
    <form className={styles["regist-form"]} onSubmit={handleFormSubmit}>
      <input
        name="title"
        type="text"
        placeholder="할일 제목"
        value={input.title}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        placeholder="할일 내용"
        value={input.content}
        onChange={handleInputChange}
      />
      <div className={buttonStyles["btn-group"]}>
        <button
          type="button"
          className={buttonStyles["btn-pink"]}
          onClick={handleBackBtnClick}
        >
          취소
        </button>
        <button className={buttonStyles["btn-pink"]}>등록</button>
      </div>
    </form>
  );
};

export default Form;
