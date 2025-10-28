import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    navigate("/emaillogin"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Log In</h1>
      <p className="text-gray-600 mb-8">
        New to this site?{" "}
        <button
          // onClick={() => navigate("/signup")}
          onClick={() => navigate("/emailsignup")}

          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>

      <div className="space-y-4 w-full max-w-sm">
        <button className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 transition">
          <FcGoogle size={22} />
          <span>Log in with Google</span>
        </button>

      


        <button className="flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-lg py-2 w-full hover:bg-[#145DBF] transition">
          <FaFacebook size={22} />
          <span>Log in with Facebook</span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button 
        onClick={handleEmailLogin} 
        className="border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 transition">
          Log in with Email
        </button>
      </div>
    </div>
  );
}
