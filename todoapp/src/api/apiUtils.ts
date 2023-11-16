import axios from "axios";

export const getTodoListAPI = async () => {
  try {
    const response = await axios.get<TodoListResponse>(
      `${process.env.REACT_APP_BASE_URL}/todolist/`
    );

    if (response.status === 200) {
      return response.data.items;
    }
    return [];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTodoAPI = async (todoId: string) => {
  try {
    const response = await axios.get<TodoResponse>(
      `${process.env.REACT_APP_BASE_URL}/todolist/${todoId}`
    );

    if (response.status === 200) {
      return response.data.item;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTodoAPI = async (todoId: number | string) => {
  try {
    const response = await axios.delete<TodoResponse>(
      `${process.env.REACT_APP_BASE_URL}/todolist/${todoId}`
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
