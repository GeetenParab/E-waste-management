import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "./logo1.jpeg"; // Your logo file
import MyIcon from "./MyIcon";
import { useAuthContext } from "../SignIn/AuthContext";
import useLogout from "../Hooks/useLogout";


const Header = React.memo(function Header() {
  const { authUser } = useAuthContext(); // Use context to get logged-in user data and logout function
  const [location, setLocation] = useState("Fetching location...");
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for username dropdown

  const { logout } = useLogout();
  // Function to get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          setLocation("Location permission denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  // Function to fetch location details using latitude and longitude
  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4b87c36896044022a973792d8d570aec`
      );
      const data = await response.json();
      const locationDetails = data.results[0].components;
      setLocation(`${locationDetails.city}, ${locationDetails.state}`);
    } catch (error) {
      setLocation("Unable to fetch location");
    }
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/services", name: "Services" },
    { path: "/facilities", name: "Facility" },
    { path: "/education", name: "Education" },
    { path: "/contact-us", name: "Contact" },
  ];

  // Toggle the dropdown when the username is clicked
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-black">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img src={logo1} alt="Logo" className="h-20 w-30 pr-8" /> {/* Logo image */}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-200 hover:text-orange-500 focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation links for desktop */}
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.path} className="relative group">
              <Link
                to={link.path}
                className="text-gray-200 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
              {/* Underline effect */}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black">
          <ul className="flex flex-col space-y-4 py-4 px-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-200 hover:text-orange-500 transition-colors"
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div className="flex items-end mr-10">
          {/* Display fetched location */}
          <MyIcon />
          <div className="text-orange-500 ml-2">{location}</div>
        </div>

        {authUser ? (
          // If user is logged in, show the username and dropdown
          <div className="relative dropdown">
            <button
              onClick={handleDropdownToggle}
              className="text-orange-500 hover:text-gray-300 font-bold transition-colors"
            >
             {authUser.username}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={logout} // Call the logout function from the context
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in, show the Sign In button
          <Link
            to="/signin"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-gray-900 transition-colors py-2 px-4 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
});

export default Header;
