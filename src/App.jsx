import React from "react";
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import Home from "./components/Home";
import AddProduct from "./components/Navigations/AddProduct";
import MarketPlace from "./components/Navigations/MarketPlace";
import MarketNews from "./components/Navigations/MarketNews";
import Profile from "./components/Navigations/profile";
import Notifications from "./components/Navigations/Notifications";
import HelpAndFaqs from "./components/Navigations/HelpAndFaqs";

const App = () => {

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <main className="p-0 overflow-y-auto">
          {/* Place your router here with your pages/components */}
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            {/* SignIn Page */}
            <Route path="/signin" element={<SignInPage />} />
            {/* SignUp Page */}
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Home Page */}
            <Route path="/home/*" element={<Home />} />
            {/* Add a Product Page */}
            <Route path="/home/add-product" element={<AddProduct />} />

            {/* MarketPlace Page */}
            <Route path="/home/marketplace" element={<MarketPlace />} />

            {/* MarketNews Page */}
            <Route path="/home/marketnews" element={<MarketNews />} />

            {/* Settings Page */}
            <Route path="/home/profile" element={<Profile />} />

            {/* Notifications Page */}
            <Route path="/home/notifications" element={<Notifications />} />

            {/* Help and FAQs Page */}
            <Route path="/home/help" element={<HelpAndFaqs />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;