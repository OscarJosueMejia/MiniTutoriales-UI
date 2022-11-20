import { useState } from "react";
import Actions from "./Actions";
import NewTodoForm from "./NewTodoForm";
import TodoListContainer from "./TodoListContainer";
import "./TodoList.css";

const TodoList = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Todo 1", completed: false },
    { id: 2, text: "Todo 2", completed: true },
    { id: 3, text: "Todo 3", completed: false },
    { id: 4, text: "Todo 4", completed: true },
    { id: 5, text: "Todo 5", completed: false },
  ]);

  const [filterBy, setFilterBy] = useState("Todos");
  const actionHandler = (action: string) => {
    setFilterBy(action);
  };
  const addTodo = (todo: string) => {
    const nextId = todoList.length + 1;
    const newTodo = {
      id: nextId,
      text: todo,
      completed: false
    };
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      Filtrado por: {filterBy}
      <TodoListContainer
        todos={
          filterBy === "Todos"
            ? todoList
            : todoList.filter((o) => o.completed === (filterBy === "Completados"))
        }
      />
      <Actions actionHandler={actionHandler} />
    </>
  );
};

export default TodoList;
