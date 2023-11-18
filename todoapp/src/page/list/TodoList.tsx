import axios from "axios";
import { useRecoilValue } from "recoil";
import { doneState, timeState, inputState } from "atoms/FilterState";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteTodoAPI, getTodoListAPI } from "api/apiUtils";
import styles from "./TodoList.module.css";
import BasicLayout from "layout/basic/BasicLayout";
import Filter from "components/filter/Filter";

function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<number | null>();

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const doneSort = useRecoilValue(doneState);
  const timeSort = useRecoilValue(timeState);
  const inputSort = useRecoilValue(inputState);
  const debouncedSearchValue = useDebounce(inputSort);

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
        await getData();
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
        await getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sort = (data: TodoItem[]) => {
    let filteredData = data;
    if (doneSort !== "All") {
      filteredData = filteredData.filter((item) =>
        doneSort === "Done" ? item.done : !item.done
      );
    }

    if (timeSort) {
      console.log(timeSort);
      filteredData = filteredData.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    if (inputSort) {
      filteredData = filteredData.filter((item) =>
        item.title.includes(inputSort)
      );
    }

    setTodoList(filteredData);
  };

  const getData = async () => {
    try {
      const data = await getTodoListAPI();
      sort(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [doneSort, timeSort, debouncedSearchValue]);

  return (
    <>
      <BasicLayout headerTitle="TodoList">
        <Filter />
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
