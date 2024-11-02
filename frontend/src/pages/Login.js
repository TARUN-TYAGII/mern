import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.error("Registration Error:", message);
    }

    if (isSuccess) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="relative mb-6">
            <label htmlFor="email" className="absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-6">
            <label htmlFor="password" className="absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
