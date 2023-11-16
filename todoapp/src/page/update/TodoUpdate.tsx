import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Form from "components/form/Form";
import { type FormData } from "components/form/Form";
import BasicLayout from "layout/basic/BasicLayout";

const TodoUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const onSubmit = async (input: FormData) => {
    try {
      const response = await axios.patch<AxiosResponse>(
        `${process.env.REACT_APP_BASE_URL}/todoList/${id}`,
        input
      );

      if (response.status === 200) {
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BasicLayout headerTitle="TodoList 수정 페이지">
        <Form onSubmit={onSubmit} />
      </BasicLayout>
    </>
  );
};

export default TodoUpdate;
