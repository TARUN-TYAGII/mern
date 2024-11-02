import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>Error: {message}</h1>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label htmlFor="name" className="absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-4">
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
          <div className="relative mb-4">
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
          <div className="relative mb-6">
            <label htmlFor="confirmPassword" className="absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;