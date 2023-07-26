import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex">
      {/* Main Content Area */}
      <main className="p-4">
        {/* Outlet to render child routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
