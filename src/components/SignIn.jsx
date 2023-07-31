import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import signinImage from "../assets/images/sign in image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password ) {
      setError("pls fill all fields");
      return;

  }

  const loginData = { email, password };
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
  const data = await response.json();
      console.log(data); // Handle the response from the backend
    } catch (error) {
      console.error('Error logging in:', error);
    }

    // Perform your sign-in logic with email and password
    console.log("Submitted data:", email, password);
  };
  
  useEffect(() => {
    // Function to check if the user exists and the password is correct
    const checkUserAndPassword = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        console.log(response.data); // Handle the response from the backend
        const existingUser = response.data.users;
        const users = existingUser.find((users) => users.email === email);
        
        if (!users) {
          setError("User does not exist.");
          return;
        }

        if (users.password !== password) {
          setError("Username or password is incorrect.");
          return;
        }

        // If everything is correct, you can call the onLogin function and navigate to the desired route
        onLogin(users);
        navigate("/Dashboard");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkUserAndPassword();
  }, [email, password, navigate]);
  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/6 max-h-screen overflow-auto">
        <h1 className="text-4xl text-green-600 font-bold mb-8">Sign In</h1>
        <form onSubmit={handleSignIn} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900 mb-3"
              placeholder="e.g Example@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                placeholder="Enter your password"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prevShow) => !prevShow)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-4 md:mb-8 space-x-4">
            <label className="flex items-center text-gray-700 text-base md:text-sm">
              <input type="checkbox" className="mr-2" />
              <span>Keep me signed in</span>
            </label>
            <Link to="#" className="text-blue-500 text-base md:text-sm">
              Forgot password?
            </Link>
          </div>
          <button
          onClick={handleSignIn}
           className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="text-center mt-4">
          <p className="text-gray-600">Or sign in with:</p>
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
          Don't have an Account?
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </section>
      <aside className="hidden md:block ml-2">
        <img
          src={signinImage}
          alt="Signin image"
          style={{ width: "70vw", height: "100vh" }}
        />
      </aside>
    </main>
  );
}

export default SignInPage;