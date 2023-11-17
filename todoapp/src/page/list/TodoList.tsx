import axios from "axios";
import { useRecoilValue } from "recoil";
import { filterState, timeState, inputState } from "atoms/FilterState";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteTodoAPI, getTodoListAPI } from "api/apiUtils";
import styles from "./TodoList.module.css";
import BasicLayout from "layout/basic/BasicLayout";
import Filter from "components/filter/Filter";

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const filterSort = useRecoilValue(filterState);
  const timeSort = useRecoilValue(timeState);
  const inputSort = useRecoilValue(inputState);
  const navigate = useNavigate();

  const handleChangeCheckBox = (todoId: number) => async () => {
    try {
      const todo = todoList.find((todo: TodoItem) => todo._id === todoId);

      const response = await axios.patch<TodoResponse>(
        `${process.env.REACT_APP_BASE_URL}/todoList/${todoId}`,
        {
          done: !todo?.done,
        }
      );
      if (response.status === 200) {
        await getTodo();
        sort();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (todoId: number) => async () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      const response = await deleteTodoAPI(todoId);
      if (response?.status === 200) {
        await getTodo();
        sort();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sort = () => {
    if (filterSort !== "All") {
      setTodoList((prev) => {
        let todo = prev.slice();
        todo = todo.filter((item) =>
          filterSort === "Done" ? item.done : !item.done
        );
        console.log(filterSort, todo);
        return todo;
      });
    }

    setTodoList((prev) => {
      let todo = prev.slice();
      todo.sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        if (timeSort) {
          return bDate - aDate;
        } else {
          return aDate - bDate;
        }
      });
      return todo;
    });

    setTodoList((prev) => {
      let todo = prev.slice();
      todo = todo.filter((item) => item.title.includes(inputSort));
      return todo;
    });
  };

  const getTodo = async () => {
    try {
      const data = await getTodoListAPI();
      setTodoList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getTodo();
      sort();
    })();
  }, [filterSort, timeSort]);

  return (
    <>
      <BasicLayout headerTitle="TodoList">
        <Filter sort={sort} getTodo={getTodo} />
        <ul className={styles["todo-list"]}>
          {todoList.map((todo) => {
            return (
              <li key={todo._id} className={styles.link}>
                <input
                  type="checkbox"
                  id={String(todo._id)}
                  checked={todo.done}
                  className={styles.input}
                  onChange={handleChangeCheckBox(todo._id)}
                />
                <label htmlFor={String(todo._id)}></label>
                <h3
                  className={styles.title}
                  onClick={() => navigate(`/detail/${todo._id}`)}
                >
                  {todo.title}
                </h3>
                <button
                  className={styles["btn-delete"]}
                  type="button"
                  onClick={handleDeleteClick(todo._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            );
          })}
        </ul>
        <button className={styles.button} onClick={() => navigate("/regist")}>
          +
        </button>
      </BasicLayout>
    </>
  );
};

export default TodoList;
