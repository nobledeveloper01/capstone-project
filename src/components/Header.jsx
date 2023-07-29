import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faBell,
  faQuestionCircle,
  faChevronDown,
  faSearch,
  faBars,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // Replace these with your actual user data (profilePicture and userName)
  const userProfile = {
    profilePicture: "path_to_your_profile_picture",
    userName: "John Doe",
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-green-700 relative">
      {/* Logo */}
      <div className="text-xl text-white font-bold">AgricConnect</div>

      {/* Navigation Links */}
      <nav className="lg:flex lg:space-x-4 mt-4 lg:mt-0 text-white">
        <NavLink
          to="/home"

          className="hover:text-gray-300"
        >
          Home
        </NavLink>
        <span className="border-r border-gray-600 px-2">|</span>
        <NavLink
          to="/home/add-product"
          className="hover:text-gray-300"
        >
          Add Product
        </NavLink>
        <span className="border-r border-gray-600 px-2">|</span>
        <NavLink
          to="/home/marketplace"
          className="hover:text-gray-300"
        >
          Market Place
        </NavLink>
        <span className="border-r border-gray-600 px-2">|</span>
        <NavLink
          to="/home/marketnews"
          className="hover:text-gray-300"
        >
          Market News
        </NavLink>
        <span className="border-r border-gray-600 px-2">|</span>
        <button
          className="rounded-l-md focus:outline-none"
          onClick={toggleSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {isSearchOpen && (
          <input
            type="text"
            className="px-4 py-2 rounded-r-md focus:outline-none"
            placeholder="Search..."
          />
        )}
      </nav>

      {/* Dropdown Menu */}
      <div className="relative inline-block text-left mt-4 lg:mt-0">
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none flex items-center"
        >
          {/* User Name */}
          <span className="ml-2">{userProfile.userName}</span>
          {/* Dropdown Icon */}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-4 h-4 ml-2 -mr-1 text-gray-600 pointer-events-none ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              {/* Dropdown Menu Links */}
              <Link
                to="/home/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              <Link
                to="/home/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </Link>
              <Link
                to="/home/notifications"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faBell} className="mr-2" />
                Notifications
              </Link>
              <Link
                to="/home/help"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                Help and FAQs
              </Link>
              <Link
                to="/signin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
