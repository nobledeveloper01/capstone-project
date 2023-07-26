import React from "react";
import heroBackground from "../assets/images/hero-background.jpeg";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import SignInPage from "./SignIn";

const Header = () => (
  <header className="bg-gray-800 text-white py-2 h-14">
    <nav className="container mx-auto">
      <ul className="flex justify-end space-x-4 py-2">
        <li>
          <Link
            to="/signin"
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            SIGN IN
          </Link>
        </li>
        <li>
        <Link
            to="/signup"
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            SIGN UP
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    // Navigate to your sign-in page when the "Learn More" button is clicked
    navigate("/signin");
  };

  return (
    <section
      className="relative py-10 h-600 bg-opacity-100"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="container mx-auto h-400 relative z-10 md:mx-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold  mb-6 text-white">
            Harvesting Success Together with Agric Connect.
          </h1>
          <p className="text-lg mb-10 text-white">
            Planting a seed today nurtures a better tomorrow, where farmers and
            enthusiasts cultivate innovation.
          </p>
          {/* Use the Link component to link to the sign-in page */}
          <Link to="/signin">
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-gray-700">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => (
  <section className="bg-gray-200 py-10" id="features">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8 mx-3 md:mx-10 ">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-3 md:mx-10">
        <div className="bg-white p-6 rounded">
          <h3 className="text-xl font-semibold mb-4">
            Seamless Farming Network
          </h3>
          <p>
            Connect and collaborate with a diverse community of farmers,
            agricultural experts, and enthusiasts from around the globe. Share
            knowledge, learn from others, and explore new opportunities.
          </p>
        </div>
        <div className="bg-white p-6 rounded">
          <h3 className="text-xl font-semibold mb-4">Market Access & Trade</h3>
          <p>
            Unlock new market channels and increase your sales potential. Our
            platform facilitates direct connections with buyers and sellers,
            simplifying the agricultural trade process.
          </p>
        </div>
        <div className="bg-white p-6 rounded">
          <h3 className="text-xl font-semibold mb-4">Smart Crop Management</h3>
          <p>
            Optimize your crop production with intelligent analytics and
            insights. Monitor weather patterns, soil conditions, and crop health
            in real-time, ensuring the best possible yields.
          </p>
        </div>
        <div className="bg-white p-6 rounded">
          <h3 className="text-xl font-semibold mb-4">Secure Data Management</h3>
          <p>
            Rest assured that your data is safe and confidential. We prioritize
            data security and privacy, allowing you to focus on your farming
            activities without worry.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4" id="footer">
    <div className="container mx-auto text-center">
      <p>Contact us: AgricConnect@example.com</p>
      <p>&copy; {new Date().getFullYear()} Agric connect</p>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="App">
    <Header />
    <HeroSection />
    <FeaturesSection />
    <Footer />
  </div>
);

export default LandingPage;
