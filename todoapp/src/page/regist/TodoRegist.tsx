import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Form from "components/form/Form";
import { type FormData } from "components/form/Form";
import BasicLayout from "layout/basic/BasicLayout";

const TodoRegist = () => {
  const navigate = useNavigate();

  const onSubmit = async (input: FormData) => {
    const confirm = window.confirm("등록 하시겠습니까?");
    if (!confirm) return;

    try {
      const response = await axios.post<AxiosResponse>(
        `${process.env.REACT_APP_BASE_URL}/todolist`,
        input
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BasicLayout headerTitle="TodoList 등록페이지">
        <Form onSubmit={onSubmit} />
      </BasicLayout>
    </>
  );
};

export default TodoRegist;
