import React from "react";
import { RxCross1 } from "react-icons/rx";

const GoalItem = ({ goal, onDelete }) => {
  return (
    <div className="goal-item bg-gray-800 text-white p-4 rounded-lg shadow-lg relative">
      <button onClick={() => onDelete(goal._id)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" aria-label="Delete goal">
        <RxCross1 className="w-5 h-5" />
      </button>

      <div className="text-sm text-gray-400">{new Date(goal.createdAt).toLocaleDateString()}</div>
      <h1 className="text-xl font-semibold mt-2">{goal.text}</h1>
    </div>
  );
};

export default GoalItem;
