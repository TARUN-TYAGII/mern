import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Goals from "../components/Goals";
import { getGoals, reset, deteteGoal } from "../features/goals/goalSlice";
import GoalItem from "./GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, isSuccess, message } = useSelector((state) => state.goal);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user && !isSuccess) {
      dispatch(getGoals());
    }

    if (isError) {
      alert(message);
    }

    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [user, navigate, isError, message, isSuccess, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleDelete = async (id) => {
    dispatch(deteteGoal(id));
  };

  return (
    <>
      <section>
        <h1 className="text-2xl text-center font-semibold text-gray-600 mb-4">Welcome {user?.name || user?.data?.name}</h1>
      </section>

      <Goals />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {goals.length > 0 ? (
          goals.map((goal) => <GoalItem key={goal._id} goal={goal} onDelete={(id) => handleDelete(id)} />)
        ) : (
          <h1 className="text-gray-800 text-center col-span-full">No goals set yet</h1>
        )}
      </section>
    </>
  );
};

export default Dashboard;
