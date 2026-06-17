import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());

      const data =
        await authService.login({
          employeeId,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure());

      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Real Estate ERP
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Employee ID"
            className="w-full p-3 border rounded mb-4"
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;