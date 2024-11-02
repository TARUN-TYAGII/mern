import axios from "axios";

const USER_API_URL = "http://localhost:5000/api/user";

const register = async (user) => {
  const response = await axios.post(`${USER_API_URL}/register`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${USER_API_URL}/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
