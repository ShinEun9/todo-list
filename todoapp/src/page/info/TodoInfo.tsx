import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicLayout from "layout/basic/BasicLayout";
import styles from "./TodoInfo.module.css";
import buttonStyles from "styles/Button.module.css";
import { deleteTodoAPI, getTodoAPI } from "api/apiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const listKeyName = {
  title: "제목",
  content: "내용",
  createdAt: "생성일",
  updatedAt: "수정일",
};
type Key = keyof typeof listKeyName;

const TodoInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoInfo, setTodoInfo] = useState<TodoItem>();

  const handleDeleteClick = async () => {
    const confirm = window.confirm("정말 삭제 하시겠습니까?");
    if (!confirm) return;

    try {
      if (!id) throw new Error("아이디가 없습니다");

      const response = await deleteTodoAPI(id);

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodoInfo = async () => {
      try {
        if (!id) throw new Error("아이디가 없습니다");

        const data = await getTodoAPI(id);
        setTodoInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTodoInfo();
  }, []);

  return (
    <BasicLayout headerTitle="TodoList 상세 페이지">
      <dl className={styles["detail-area"]}>
        {todoInfo &&
          Object.keys(listKeyName).map((key: string) => {
            return (
              <div key={key} className={styles["detail-row"]}>
                <dt className={styles["row-title"]}>
                  {listKeyName[key as Key]}
                </dt>

                <dd className={styles["row-content"]}>
                  {todoInfo[key as keyof TodoItem]}
                </dd>
              </div>
            );
          })}
      </dl>

      <div className={buttonStyles["btn-group"]}>
        <button
          className={buttonStyles["btn-white"]}
          onClick={() => navigate(`/detail/update/${id}`)}
        >
          수정
        </button>

        <button
          className={buttonStyles["btn-pink"]}
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      </div>
    </BasicLayout>
  );
};

export default TodoInfo;
