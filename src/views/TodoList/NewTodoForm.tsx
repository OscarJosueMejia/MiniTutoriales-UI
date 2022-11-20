import { Button } from "@components/Buttons/Button";
import { useState } from 'react';

interface IPropsNewTodoForm {
  addTodo: (todo: string) => void;
}
const NewTodoForm = (
  { addTodo = (todo: string) => {} }: IPropsNewTodoForm
) => {
  const [todoText, setTodoText] = useState('');

  const submitHandler = (e: unknown) => {
    addTodo(todoText);
    setTodoText('');
  };
  const onChangeHandler = (e: unknown) => {
    (e as {preventDefault: Function}).preventDefault();
    (e as {stopPropagation: Function}).stopPropagation();
    const { value } = (e as {target:{value:string}}).target;
    setTodoText(value);
  };
  return (
    <section className="TodoAddForm">
        <input type="text" value={todoText} onChange={onChangeHandler}  />
        <Button onClick={submitHandler}>Add</Button>
    </section>
  );
}

export default NewTodoForm;
