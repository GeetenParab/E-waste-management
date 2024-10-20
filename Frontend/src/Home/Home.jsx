import React, { useState, useEffect } from 'react';
import './animations.css'; // Import CSS for animations
import { Link } from "react-router-dom";
const LandingPage = () => {
  const textArray = [
    'Innovative and Impactful Solutions',
    'E-Waste Management Solutions',
    'For a Sustainable Future',
  ];
  const [currentText, setCurrentText] = useState(textArray[0]); // Initialize with the first text

  useEffect(() => {
    let textIndex = 0;
    
    const cycleTexts = () => {
      textIndex = (textIndex + 1) % textArray.length; // Cycle through texts
      setCurrentText(textArray[textIndex]);
    };

    const interval = setInterval(cycleTexts, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h2 className="text-3xl text-orange-600 font-semibold mb-4 animate-fade-in">
          Welcome to ELocate
        </h2>
        <h1 className="text-4xl font-bold text-gray-800">
          Your technology partner for {currentText} {/* Static text with changing content */}
        </h1>
        <p className="text-lg text-gray-600 mt-4 animate-fade-in-long">
          <span className="text-orange-600">ELocate:</span> Transforming E-Waste Management. 
          Find E-waste facilities effortlessly with our platform. Your key to responsible recycling and sustainability.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 text-lg rounded-lg">
          <Link to='/services'>Start Recycling</Link>
            
          </button>
          <button className="bg-orange-50 border-2 border-orange-600 hover:bg-orange-600  hover:text-white text-orange-600 py-3 px-6 text-lg rounded-lg">
          
            <Link to='/facilities'>Locate Facility</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
