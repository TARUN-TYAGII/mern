import axios from "axios";

const GOAL_API_URL = "https://mern-2-9x9c.onrender.com/api/goals";

const createGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${GOAL_API_URL}`, goal, config);
  return response.data;
};

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${GOAL_API_URL}`, config);
  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`${GOAL_API_URL}/${id}`, config);
    return response.data;
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal
};

export default goalService;
