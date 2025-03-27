import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login Attempt: ${username}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">Trust Management Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
