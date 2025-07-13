import React, { useContext } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { todoContext } from "../../Wrapper";

const Create = () => {
  const [todos, setTodos] = useContext(todoContext);
  const localStorageTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    data.isCompleted = false;
    data.id = nanoid();

    setTodos([...todos, data]);
    localStorage.setItem("todos", JSON.stringify([...localStorageTodos, data]));
    toast.success("To do created", {
      theme: "dark",
    });
    reset();

    // const copyTodos = [...todos]
    // copyTodos.push(data)
    // setTodos(copyTodo)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex justify-center items-center mb-14 flex-wrap sm:flex-nowrap w-full md:w-[80%] m-auto"
      >
        <input
          {...register("title", {
            required: "title cannot be empty!!!!",
          })}
          autoFocus
          className="border-b w-[80%] sm:w-[70%] md-w-[60%] outline-0 px-3 py-1 text-lg md:text-xl placeholder:text-lg sm:placeholder:text-xl mb-4"
          type="text"
          placeholder="Enter title"
        />
        <br />

        <button className=" bg-gradient-to-r from-amber-600 via--pink-600 to-pink-700 py-1.5 ml-2 rounded hover:opacity-[0.9] active:scale-[.97] w-[80%] sm:w-1/7 ">
          Add Tasks
        </button>
      </form>
      {/* {errors && errors.title && errors.title.message && (<small className="text-red-600 -mt-14">{errors.title.message}</small>)} */}
      <p className="text-red-600 -mt-21 text-center text-sm">
        {errors?.title?.message}
      </p>
    </>
  );
};

export default Create;
