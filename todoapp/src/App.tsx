import { Route, Routes, Navigate } from "react-router-dom";
import TodoList from "page/list/TodoList";
import TodoRegist from "page/regist/TodoRegist";
import TodoInfo from "page/info/TodoInfo";
import TodoUpdate from "page/update/TodoUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/regist" element={<TodoRegist />} />
      <Route path="/detail/:id" element={<TodoInfo />} />
      <Route path="/detail/update/:id" element={<TodoUpdate />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
