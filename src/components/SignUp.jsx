import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/images/sign in image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Registration from "./Registration";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // If there are no errors, setShowModal to true
    setShowModal(true);
  };
  

    // try {
    //   const response = await axios.post("YOUR_BACKEND_API_ENDPOINT", {
    //     email,
    //     password,
    //   });
    //   console.log("Signup successful!", response.data);
    //   // Navigate to another page on successful signup
    //   navigate("/Registration");
    // } catch (error) {
    //   setError("Signup failed. Please try again.");
    //   console.error(error);
    // }
  
  

  return (
    <main className="flex justify-center items-center min-h-screen">
      <aside className="hidden md:block w-1/2">
        <img
          src={signupImage}
          alt="SignUp image"
          style={{ width: "70vw", height: "110vh" }}
        />
      </aside>
      <section className="bg-white p-8 rounded-lg shadow-md w-1/2 max-h-screen overflow-auto">
        <h1 className="text-4xl text-green-600 font-bold mb-8">Sign Up</h1>
        <form onSubmit={handleSignUp} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900 mb-3"
              placeholder="e.g Example@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-4 md:mb-8 space-x-4">
            <a href="#" className="text-blue-500 text-base md:text-sm">
              Forgot password?
            </a>
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-center mt-4">
          <p className="text-gray-600">Or sign Up with:</p>
          <div className="flex flex-col items-center mt-2">
            <button className="bg-red-500 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Google
            </button>
            <button className="bg-blue-500 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Facebook
            </button>
            <button className="bg-blue-800 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
              LinkedIn
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </section>
      <Registration showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
  }