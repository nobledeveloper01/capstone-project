import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faChartBar, faStoreAlt, faNewspaper, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`fixed h-screen w-64 top-0 left-0 bg-green-600 text-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Your sidebar content */}
      <div className="flex flex-col space-y-2">
        {/* Nav Links */}
        <nav className={`flex flex-grow flex-col space-y-2 ${isOpen ? 'mt-4' : 'hidden md:flex'}`}>
          <Link to="/home" className="flex items-center text-white">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {isOpen && 'Home'}
          </Link>
          <Link to="/home/add-product" className="flex items-center text-white">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {isOpen && 'Add a Product'}
          </Link>
          <Link to="/home/dashboard" className="flex items-center text-white">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            {isOpen && 'Dashboard'}
          </Link>
          <Link to="/home/marketplace" className="flex items-center text-white">
            <FontAwesomeIcon icon={faStoreAlt} className="mr-2" />
            {isOpen && 'MarketPlace'}
          </Link>
          <Link to="/home/marketnews" className="flex items-center text-white">
            <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
            {isOpen && 'MarketNews'}
          </Link>
          <Link to="/home/settings" className="flex items-center text-white">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            {isOpen && 'Settings'}
          </Link>
        </nav>

        {/* Logout Button */}
        <button className={`bg-white text-green-600 py-2 px-4 rounded-2xl ${isOpen ? 'mt-4' : 'hidden md:block'}`}>
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
