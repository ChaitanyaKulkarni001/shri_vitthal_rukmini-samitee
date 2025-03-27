import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setAuthToken } from "../utils/auth"; // Adjust path as needed
import IMG from "../assets/VithhalRukmini.png";

const Login = () => {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token using your helper function
        setAuthToken(data.token);

        // Custom SweetAlert2 success alert with animated checkmark
        Swal.fire({
          html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div class="checkmark-circle">
                <svg viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="25"></circle>
                  <path class="checkmark" d="M14 27 l7 7 l16 -16"></path>
                </svg>
              </div>
              <div style="margin-top: 20px; font-size: 1.5rem; color: #4CAF50;">Login successful !</div>
            </div>
          `,
          showConfirmButton: false,
          timer: 1500,
          backdrop: true,
        }).then(() => {
          navigate("/form");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error || "Login failed. Please try again.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="fixed min-h-screen overflow-hidden bg-gradient-to-b from-yellow-200 to-orange-500">
      {/* Header Section */}
      <div className="py-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-yellow-800">
          श्री विठ्ठल रुक्मिणी मंदिर समिति
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* Image Section */}
        <div className="w-[36%] mr-20 mb-10">
          <img className="mr-4" src={IMG} alt="Login Visual" />
        </div>

        {/* Login Form Section */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow-2xl w-96 border-4 border-yellow-600">
            <h2 className="text-center text-3xl font-extrabold text-yellow-800 mb-4 border-b-2 border-yellow-700 pb-2">
              श्रद्धेय विश्वसनीयता प्रवेश
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-yellow-800 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-yellow-600 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
