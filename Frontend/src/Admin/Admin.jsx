import React from 'react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">This is for Admin</h1>
      <Link to="/admin/login">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Admin Login
        </button>
      </Link>
    </div>
  );
}
