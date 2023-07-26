import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";

// Import the components for the routes
import AddProduct from "./components/Navigations/AddProduct";
import DashboardPage from "./components/Navigations/DashboardPage";
import MarketPlace from "./components/Navigations/MarketPlace";
import MarketNews from "./components/Navigations/MarketNews";
import Settings from "./components/Navigations/Settings";
import Notifications from "./components/Navigations/Notifications";
import HelpAndFaqs from "./components/Navigations/HelpAndFaqs";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="p-4 overflow-y-auto">
          {/* Place your router here with your pages/components */}
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            {/* SignIn Page */}
            <Route path="/signin" element={<SignInPage />} />
            {/* SignUp Page */}
            <Route path="/signup" element={<SignUpPage />} />
            {/* Registration Page */}
            <Route path="/registration" element={<Registration />} />

            {/* Home Page */}
            <Route path="/home/*" element={<AuthenticatedRoutes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <>
      {/* Main Content Area */}
      <main className="p-4">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Add a Product Page */}
          <Route path="/AddProduct" element={<AddProduct />} />

          {/* Dashboard Page */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* MarketPlace Page */}
          <Route path="/marketplace" element={<MarketPlace />} />

          {/* MarketNews Page */}
          <Route path="/marketnews" element={<MarketNews />} />

          {/* Settings Page */}
          <Route path="/settings" element={<Settings />} />

          {/* Notifications Page */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Help and FAQs Page */}
          <Route path="/help" element={<HelpAndFaqs />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
