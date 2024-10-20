import React, { useState } from 'react';
import {Link} from "react-router-dom";
import useLogin from '../Hooks/useLogIn';
const SignIn = () => {
  const [inputs, setInputs] = useState({
    password: '',
    email: ''
  });
  const [showPassword, setShowPassword] = useState(false);
    const {login,loading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    await login(inputs);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center">Welcome back</h2>
        <p className="text-gray-500 text-center mb-6">Please enter your details</p>
        
        <form onSubmit={handleSubmit}> 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">Show Password</label>
            </div>
            <a href="#" className="text-black font-semibold hover:underline text-sm">Forgot password?</a>
          </div>

          <button
            type="submit"
            className={`mt-6 w-full py-2 rounded transition-colors ${loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} text-white`}
            disabled={loading}  // Disable the button while loading
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to='/signup' className="text-black font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
