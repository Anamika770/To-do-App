import React, { useState } from "react";
import "./index.css";
import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  

  return (
    <div className=" max-w-screen min-h-screen bg-black text-white  text-center font-thin p-4 ">
      <h1 className=" text-3xl sm:text-4xl mb-14 font-thin">
        Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600 font-thin"> Personalised</span> Tasks
      </h1>
      <div className=" w-[100%] m-auto flex flex-col gap-6">
        <Create  />
        <Read  />
      </div>
    </div>
  );
};

export default App;
