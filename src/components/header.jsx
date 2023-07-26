import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faBell, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Add state for Sidebar

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle the Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      
      <header className="fixed top-0 left-64 right-0 bg-white text-green-600 border-2 p-1 flex justify-between items-center">
        {/* AgricConnect Logo */}
        {/* Hamburger Menu for Mobile */}
      <div className="">
        <button onClick={toggleSidebar} className="text-green-600">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

        <div className="text-2xl font-bold text-green-600">AgricConnect</div>

        {/* Search Button */}
        <div className="flex items-center space-x-2">
          <button className="text-green-600">
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {/* Notification Bell Icon */}
          <button className="text-green-600">
            <FontAwesomeIcon icon={faBell} />
          </button>

          {/* Profile Picture and Dropdown */}
          <div className="relative">
            {/* Replace the profile picture source with your actual profile picture */}
            <img
              src="path_to_profile_picture.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={handleDropdownToggle}
              className="text-white pl-2 pr-1 focus:outline-none"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded shadow-md">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Settings
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Pass the toggleSidebar function as a prop to the Sidebar component */}
      <Sidebar onToggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Header;
