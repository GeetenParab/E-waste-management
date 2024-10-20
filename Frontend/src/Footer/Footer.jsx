import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg"; // Ensure you use the same logo

const Footer = () => {
  return (
    <footer className="bg-[#ffece2] py-10">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <img src={logo} alt="E-Locate Logo" className="h-12 w-auto mb-4" />
          <p className="text-gray-700 mb-4">
            ELocate: Transforming E-Waste Management. Find e-waste facilities effortlessly with our platform. Your key to responsible recycling and sustainability.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 py-2 px-4 rounded-md text-gray-700"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v16h16V4H4zm16-2a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h16z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-800">Our Services</h4>
          <ul className="space-y-2">
            <li><Link to="/smartphone-recycle" className="text-gray-700 hover:text-orange-500 transition">Smartphone Recycle</Link></li>
            <li><Link to="/laptop-recycle" className="text-gray-700 hover:text-orange-500 transition">Laptop Recycle</Link></li>
            <li><Link to="/accessories-recycle" className="text-gray-700 hover:text-orange-500 transition">Accessories Recycle</Link></li>
            <li><Link to="/television-recycle" className="text-gray-700 hover:text-orange-500 transition">Television Recycle</Link></li>
            <li><Link to="/refrigerator-recycle" className="text-gray-700 hover:text-orange-500 transition">Refrigerator Recycle</Link></li>
            <li><Link to="/washing-machine-recycle" className="text-gray-700 hover:text-orange-500 transition">Washing Machine Recycle</Link></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-800">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/about-us" className="text-gray-700 hover:text-orange-500 transition">About us</Link></li>
            <li><Link to="/education" className="text-gray-700 hover:text-orange-500 transition">Education</Link></li>
            <li><Link to="/e-waste-facilities" className="text-gray-700 hover:text-orange-500 transition">E-waste Facilities</Link></li>
            <li><Link to="/latest-news" className="text-gray-700 hover:text-gorangereen-500 transition">Latest News</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-orange-500 transition">Contact Us</Link></li>
            <li><Link to="/our-blog" className="text-gray-700 hover:text-orange-500 transition">Our Blog</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-gray-800">Contact Us</h4>
          <p className="text-gray-700 mb-2">
            Nerul, Navi-Mumbai 400706
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Phone:</span> +911234567890
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Email:</span> contact@elocate.com
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 transition">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 transition">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 transition">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-4">
        <div className="container mx-auto px-8 text-center text-gray-600">
          <p>© 2024 ELocate | All Rights Reserved by <span className="text-orange-500">xyz</span></p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy-policy" className="hover:text-orange-500 transition">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-orange-500 transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
