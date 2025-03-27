import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = `${baseUrl}/api/login/`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        alert("Login successful!");
        // Redirect to the form page after successful login
        navigate("/form");
      } else {
        alert(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-200 to-yellow-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 border-4 border-yellow-600">
        <h2 className="text-center text-3xl font-extrabold text-yellow-800 mb-4 border-b-2 border-yellow-700 pb-2">
          श्रद्धेय विश्वसनीयता प्रवेश
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-yellow-800 font-semibold">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-yellow-600 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-800 font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-yellow-600 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-700 text-white p-2 rounded-lg font-semibold hover:bg-yellow-800 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
