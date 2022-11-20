import Buttons from "@components/Buttons";

interface IPropsActions {
  actionHandler: (action: string) => void;
}

const { Button } = Buttons;

const Actions = ({ actionHandler = (action: string) => {} }: IPropsActions) => {
  const clickHandler = (e: unknown) => {
    const { name } = (e as { target: { name: string } }).target;
    actionHandler(name);
  };
  return (
    <section className="TodoListActions">
      <Button name="Todos" onClick={clickHandler}>
        Todos
      </Button>
      <Button name="Pendientes" onClick={clickHandler}>
        Pendientes
      </Button>
      <Button name="Completados" onClick={clickHandler}>
        Completados
      </Button>
    </section>
  );
};

export default Actions;
