import { createContext, useState } from "react"

export const todoContext = createContext(null);


const Wrapper = (props) => {
  const [todos, setTodos] = useState([]);

  return (
    <todoContext.Provider value={[todos, setTodos]}>
        {props.children}
    </todoContext.Provider>
  )
}

export default Wrapper