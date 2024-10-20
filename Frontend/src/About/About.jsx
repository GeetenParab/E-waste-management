import React from "react";
import aboutImage from "./R.jpeg"; // Replace with your actual image path
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="bg-orange-50 py-20">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section - Text */}
        <div className="flex flex-col justify-center">
          <h4 className="text-orange-600 font-semibold mb-2">-About ELocate-</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Revolutionizing E-Waste Locator and Management
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In India, the improper disposal of e-waste contributes to the alarming annual
            collection of 1.71 million metric tons. Locating trustworthy e-waste collection
            facilities remains a significant challenge, intensifying this environmental issue.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The ELocate Web Platform is conceived to directly address this issue. Our platform
            offers a dynamic, user-friendly interface for individuals and businesses seeking
            reliable e-waste collection facilities.
          </p>
          <div className="flex space-x-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            <Link to='/contact-us'>Contact Us</Link>
              
            </button>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 transition hover:text-white">
              <Link to='/services'> Recycling Services</Link>
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img src={aboutImage} alt="E-waste management graphic" className="w-full h-auto rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default About;
