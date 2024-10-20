import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../Hooks/useSignup.js";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: ''
  });
  
  const { loading, signup } = useSignup();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    await signup(inputs);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
          Welcome to Elocate
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please enter your details to register
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">UserName</label>
              <input
                type="text"
                placeholder="User Name"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black"
                value={inputs.phoneNumber}
                onChange={(e) => setInputs({ ...inputs, phoneNumber: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-gray-600">
              Show Password
            </label>

            <Link to="/forgot-password" className="ml-auto text-gray-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            
            type="submit"
            className={`mt-6 w-full py-2 rounded transition-colors ${loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} text-white`}
            disabled={loading}  // Disable the button while loading
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/signin" className="text-black-600 hover:underline font-bold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
