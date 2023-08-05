import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/images/sign in image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import UploadFiles from "./FileUpload";

const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes 


export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [address, setAddress] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [farmingType, setFarmingType] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [userCategory, setUserCategory] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !otherName ||
      !dob ||
      !gender ||
      !nationality ||
      !selectedState ||
      !selectedLga ||
      !address ||
      !phoneNumber ||
      !farmingType ||
      !identificationType ||
      !userCategory) {
      setError("Please fill all fields.");
      return;
    }

    try {
      // Perform your signup logic with email and password
      const response = await axios.post('http://localhost:5000/api/register', { email, password, firstName, lastName, otherName, dob, gender, nationality, selectedState, selectedLga, address, areaCode, phoneNumber, farmingType, identificationType, userCategory });
      console.log("Signup successful!", response.data);
      // Navigate to another page on successful signup
      navigate("/signin");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error(error);
    };
   if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }  
};

     

  // Fetch nationalities from API on component mount
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3/all")
      .then((response) => {
        const countries = response.data;
        const nationalityNames = countries.map(
          (country) => country.name.common
        );
        const sortedNationalities = nationalityNames.sort((a, b) =>
          a.localeCompare(b)
        );
        setNationalities(sortedNationalities);
      })
      .catch((error) => {
        console.error("Error fetching nationalities:", error);
      });
  }, []);

  // Fetch LGAs based on the selected state
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          "https://raw.githubusercontent.com/Godspraise01/state-lga/main/state-lga.json"
        )
        .then((response) => {
          const statesData = response.data;
          const selectedStateData = statesData.find(
            (stateData) => stateData.state === selectedState
          );

          if (selectedStateData && selectedStateData.lgas) {
            setLgas(selectedStateData.lgas);
          } else {
            setLgas([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching LGAs:", error);
          setLgas([]);
        });
    }
  }, [selectedState]);

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleStatesChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedLga(""); // Reset the selected local government when the state changes
  };

  const handleLgaChange = (e) => {
    setSelectedLga(e.target.value);
  };

  const handleFileChange = (selectedFile) => { 
    setFile(selectedFile); 
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <aside className="hidden md:block w-1/2">
        <img
          src={signupImage}
          alt="SignUp image"
          style={{ width: "70vw", height: "110vh" }}
        />
      </aside>
      <section className="bg-white p-8 rounded-lg shadow-md w-1/2 max-h-screen overflow-auto">
        <h1 className="text-4xl text-green-600 font-bold mb-8">Sign Up</h1>
        <form onSubmit={handleSignUp} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900 mb-3"
              placeholder="e.g Example@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <div className="mb-4">
          <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold mb-1 w-full"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="otherName"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Other Name
                  </label>
                  <input
                    type="text"
                    id="otherName"
                    name="otherName"
                    value={otherName}
                    onChange={(e) => setOtherName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholder="Enter your other name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Date of Birth*
                  </label>
                  <DatePicker
                    id="dob"
                    name="dob"
                    selected={dob}
                    onChange={(date) => setDob(date)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholderText="Select your date of birth"
                    dateFormat="dd/MM/yyyy" // Customize the date format if needed
                    showYearDropdown // Optional: Show year dropdown in date picker
                    dropdownMode="select" // Optional: Specify how the year dropdown works
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Gender*
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nationality"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Nationality*
                  </label>
                  <select
                    id="nationality"
                    name="nationality"
                    value={nationality}
                    onChange={handleNationalityChange}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">Select Nationality</option>
                    {nationalities.map((nationalityOption) => (
                      <option key={nationalityOption} value={nationalityOption}>
                        {nationalityOption}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    State*
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={selectedState}
                    onChange={handleStatesChange}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">- Select -</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="AkwaIbom">AkwaIbom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="FCT">FCT</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamafara</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="lga"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Local Government Area*
                  </label>
                  <select
                    id="lga"
                    name="lga"
                    value={selectedLga}
                    onChange={handleLgaChange}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">- Select -</option>
                    {lgas.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Address Input */}
                <div className="col-span-3 mb-3">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Address*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="flex flex-column justify-between mb-3">
                  {/* Area Code Input */}
                  <div className="w-1/7">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Phone Number*
                    </label>
                    <select
                      id="areaCode"
                      name="areaCode"
                      value={areaCode}
                      onChange={(e) => setAreaCode(e.target.value)}
                      className="1/2 px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                      required
                    >
                      <option value="">Area Code</option>
                      <option value="234">+234</option>
                      {/* Add more area codes here */}
                    </select>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-3/2 px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-1 mb-2">
                  <label
                    htmlFor="farmingType"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Farming Type*
                  </label>
                  <select
                    id="farmingType"
                    name="farmingType"
                    value={farmingType}
                    onChange={(e) => setFarmingType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">Select farming type</option>
                    <option value="crop">Crop Farming</option>
                    <option value="livestock">Livestock Farming</option>
                    <option value="poultry">Poultry Farming</option>
                    <option value="None">None</option>
                    {/* Add more farming types here */}
                  </select>
                </div>
                <div className="col-span-1 mb-2">
                  <label
                    htmlFor="identificationType"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Means of Identification*
                  </label>
                  <select
                    id="identificationType"
                    name="identificationType"
                    value={identificationType}
                    onChange={(e) => setIdentificationType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">Select means of identification</option>
                    <option value="nationalID">National ID</option>
                    <option value="driverLicense">Driver's License</option>
                    <option value="passport">Passport</option>
                    <option value="voterID">Voter's ID</option>
                    <option value="AssociationID">Association ID</option>

                    {/* Add more means of identification options here */}
                  </select>
                </div>
                <div> 
                  <UploadFiles />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="userCategory"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    User Category*
                  </label>
                  <select
                    id="userCategory"
                    name="userCategory"
                    value={userCategory}
                    onChange={(e) => setUserCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    required
                  >
                    <option value="">Select user category</option>
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="supplier">Supplier</option>
                    {/* Add more user categories here if needed */}
                  </select>
                </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-center mt-4">
          <p className="text-gray-600">Or sign Up with:</p>
          <div className="flex flex-col items-center mt-2">
            <button className="bg-red-500 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Google
            </button>
            <button className="bg-blue-500 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Facebook
            </button>
            <button className="bg-blue-800 w-full text-white px-6 py-2 rounded-lg mt-2">
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
              LinkedIn
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
};