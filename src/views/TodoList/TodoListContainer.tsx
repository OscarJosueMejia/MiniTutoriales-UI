export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}
interface IPropsTodoListContainer {
  todos: ITodo[];
}
const TodoListContainer = ({
  todos = [],
}:IPropsTodoListContainer) => {
  return (
    <section className="TodoListContainer">
      {JSON.stringify(todos, null, 2)}
    </section>
  );
}
export default TodoListContainer;
