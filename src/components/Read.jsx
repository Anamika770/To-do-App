import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { todoContext } from "../../Wrapper";

const Read = () => {
  /*------------------------------------hooks----------------------------------------*/
  const [todos, setTodos] = useContext(todoContext);
  const localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const DraggedTaskIndex = useRef();

  /*------------------------------------functions-------------------------------------*/
  const deleteHandler = (id) => {
    // const copyTodos = [...todos]
    // copyTodos.findIndex((todo)=>todo.id === id)
    // copyTodos.
    const filterTodos = localStorageTodos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
    localStorage.setItem("todos", JSON.stringify(filterTodos));
    toast.error("To do deleted", {
      theme: "dark",
    });

    console.log(filterTodos);
    console.log(todos);
    console.log(localStorageTodos);
  };
  function dragStartHandler(e, index) {
    e.target.style.opacity = " 0.5";
    DraggedTaskIndex.current = index;
  }
  function dragEndHandler(e) {
    e.target.style.opacity = "1";
    DraggedTaskIndex.current = null;
  }
  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dropHandler(e, dropIndex) {
    e.preventDefault();
    let updatedTodos = [...localStorageTodos];
    const draggedTask = updatedTodos[DraggedTaskIndex.current];
    updatedTodos.splice(DraggedTaskIndex.current, 1);
    updatedTodos.splice(dropIndex, 0, draggedTask);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function toggleTodo(id) {
    const updatedTodos = localStorageTodos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  /*---------------------------------------map value-----------------------------------*/
  const renderTodos = localStorageTodos.map((todo, index) => {
    return (
      <li
        draggable
        className="w-[80%] sm:w-[85%] md-w-[60%] bg-zinc-900 px-3 py-2 flex justify-between items-center rounded-xl mb-2 hover:bg-zinc-800 "
        key={todo?.id}
        onDragStart={(e) => dragStartHandler(e, index)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, index)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        <div
          className="flex gap-4 items-center text-lg sm:text-md decoration-red-500 capitalize"
          style={
            todo?.isCompleted
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <input
            type="checkbox"
            className={`appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-green-500/100 checked:border-green-500/100 focus:outline-none transition-all duration-200 bg-center bg-no-repeat`}
            checked={todo.isCompleted}
            style={{
              backgroundImage: todo.isCompleted
                ? "url('data:image/svg+xml,%3Csvg viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%2212%22 fill=%22green%22/%3E%3Cpolyline points=%226 12 10 16 18 8%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E')"
                : "none",
            }}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo?.title}
        </div>
        <span
          className=" text-sm sm:text text-orange-400"
          onClick={() => deleteHandler(todo?.id)}
        >
          Delete
        </span>
      </li>
    );
  });
  /*----------------------------------------return-------------------------------------*/
  return (
    <div className="h-auto">
      <div>
        <ol className="text-white flex flex-col items-center w-full md:w-[80%] m-auto mt-5">
          {renderTodos}
        </ol>
      </div>
    </div>
  );
};

export default Read;
