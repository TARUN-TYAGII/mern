import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoals } from "../features/goals/goalSlice";

const Goals = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Goal", text);
    dispatch(createGoals({ text }));
    setText("");
  };


  return (
    <div className="flex flex-col items-center justify-center bg-gray-600 text-white">
      <section className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Set Your Goals</h1>
          <p className="text-gray-400 mt-2">Write down your goals and keep track of them.</p>
        </div>
      </section>

      <section className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg" >
        <form className="space-y-4">
          <label htmlFor="goal" className="block text-gray-300 text-lg font-semibold">
            Goal
          </label>
          <input
            type="text"
            id="goal"
            name="goal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Enter your goal"
          />
          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-md font-semibold text-white" onClick={handleSubmit}>
            Submit Goal
          </button>
        </form>
      </section>
    </div>
  );
};

export default Goals;
