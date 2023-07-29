import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import backgroundImage from "../assets/images/Footer.bg.jpeg";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCog,
  faQuestionCircle,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer
      className="bg-opacity-100 bg-cover bg-center items-center justify-center text-white pt-10"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "green",
      }}
    >
      <div className="container justify-center mx-auto items-center">
        <div className="grid grid-cols-1 justify-center item-center sm:grid-cols-2 md:grid-cols-3 ml-10 gap-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              {/* Add more quick links here */}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex items-center justify-center sm:justify-start space-x-4">
              <a
                href="https://www.facebook.com/your-facebook-page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="https://www.twitter.com/your-twitter-page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/your-instagram-page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/your-linkedin-page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
            </div>
          </div>

          {/* User Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-4">User Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profile">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/notifications">
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Notifications
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                  Help and FAQs
                </Link>
              </li>
              <li>
                <Link to="/signout">
                  <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                  Sign Out
                </Link>
              </li>
              {/* Add more user links here */}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center bg-green-700 mt-12 text-white text-md">
        &copy; {new Date().getFullYear()} AgricConnect. All rights reserved.
      </div>
    </footer>
    
  );
};

export default Footer;
