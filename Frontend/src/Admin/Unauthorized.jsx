import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Adjust this path according to your landing page route
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="mb-6 text-gray-600">
          You do not have permission to view this page.
        </p>
        <button
          onClick={handleBackToHome}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
