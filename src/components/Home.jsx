import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faQuestionCircle,
  faChevronDown,
  faSearch,
  faBars,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/carousel_image_1.jpg";
import image2 from "../assets/images/carousel_image_2.jpg";
import image3 from "../assets/images/carousel_image_3.jpg";
import birdsImage from "../assets/images/bird.jpg";
import cropsImage from "../assets/images/crops.jpg";
import feedsImage from "../assets/images/feeds.jpg";
import chemicalsImage from "../assets/images/chemicals.jpg";
import vegetablesImage from "../assets/images/vegetables.jpg";
import livestocksImage from "../assets/images/livestocks.jpg";
import grainsImage from "../assets/images/grains.jpg";
import tubersImage from "../assets/images/tubers.jpg";
import TrendingNews from "./TrendingNews";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const Home = () => {
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
  // Sample carousel content, you can replace it with your own content
  const carouselData = [
    { id: 1, image: image1, title: "Slide 1" },
    { id: 2, image: image2, title: "Slide 2" },
    { id: 3, image: image3, title: "Slide 3" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="rounded-full bg-green-500 p-1 absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={onClick}
          className="custom-arrow custom-prev-arrow text-white text-3xl"
        >
          {"<"}
        </button>
      </div>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="rounded-full bg-green-500 p-1 absolute right-5 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={onClick}
          className="custom-arrow custom-next-arrow text-white text-3xl"
        >
          {">"}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
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

      {/* Carousel */}
      <div className="p-0 overflow-hidden relative">
        <div className="w-full relative">
          <Slider {...settings}>
            {carouselData.map((item) => (
              <div key={item.id} className="relative">
                {" "}
                {/* Add relative positioning */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="text-center absolute bottom-0 left-0 right-0 px-4 text-white mt-5">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold mb-3"
                  >
                    Uniting the Agriculture Community for Sustainable and
                    Profitable Agric Buying and Selling.
                  </motion.h1>
                  <div className="max-w-lg mx-auto mb-4">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-lg mb-10 text-center"
                    >
                      "Planting a seed today nurtures a better tomorrow, where
                      farmers and enthusiasts cultivate innovation. Let us sow
                      the seeds of sustainable agriculture and grow a bountiful
                      future for all."
                    </motion.p>
                    <p className=" text-center font-bold text-2xl">
                      As a Farmer or Buyer?, add product.
                      <Link to="/home/add-product">
                        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-gray-700">
                          Add Product
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Top Seller Products */}
      <div className="container mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Top Seller Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-3">
          {/* Birds */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/birds">
              <img
                src={birdsImage}
                alt="Birds"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">Birds</h2>
            </Link>
          </motion.div>

          {/* Crops */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/crops">
              <img
                src={cropsImage}
                alt="Crops"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">Crops</h2>
            </Link>
          </motion.div>

          {/* Feeds */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/feeds">
              <img
                src={feedsImage}
                alt="Feeds"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">Feeds</h2>
            </Link>
          </motion.div>

          {/* Chemicals */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/chemicals">
              <img
                src={chemicalsImage}
                alt="Chemicals"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">
                Chemicals
              </h2>
            </Link>
          </motion.div>

          {/* Vegetables */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/vegetables">
              <img
                src={vegetablesImage}
                alt="Vegetables"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">
                Vegetables
              </h2>
            </Link>
          </motion.div>

          {/* Livestocks */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/livestocks">
              <img
                src={livestocksImage}
                alt="Livestocks"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">
                Livestocks
              </h2>
            </Link>
          </motion.div>

          {/* Grains */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/grains">
              <img
                src={grainsImage}
                alt="Grains"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">Grains</h2>
            </Link>
          </motion.div>

          {/* Tubers */}
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Link to="/marketplace/tubers">
              <img
                src={tubersImage}
                alt="Tubers"
                className="w-full h-32 mb-2 object-fit rounded-md"
              />
              <h2 className="text-xl text-center font-semibold mb-2">Tubers</h2>
            </Link>
          </motion.div>
        </div>
      </div>
      <TrendingNews />
      <Newsletter />
      <Footer />
    </div>
  );
};
export default Home;
