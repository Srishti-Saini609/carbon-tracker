import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Later, you’ll connect this to your backend API
    navigate("/dashboard"); // redirect after login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Log in with Email</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Log In
        </button>
      </form>
      <p className="text-gray-600 mt-4">
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
