import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";


const Registration = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 500 * 1024; // 500KB in bytes

  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
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
  const [file, setFile] = useState(null);
  const [userCategory, setUserCategory] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !otherName ||
      !email ||
      !dob ||
      !gender ||
      !nationality ||
      !selectedState ||
      !selectedLga ||
      !address ||
      !phoneNumber ||
      !farmingType ||
      !identificationType ||
      !file ||
      !userCategory
    ) {
      setError("Please fill all fields.");
      return;
    }

    // Implement your form submission logic here, including API endpoint calls
    try {
    const userData = { firstName, lastName, otherName, email, dob, gender, nationality, nationalities, lgas, selectedState, selectedLga, address, areaCode, phoneNumber, farmingType, identificationType, file, userCategory, password };
    const response = await axios.post('http://localhost:5000/api/register', userData);
    setMessage(response.data.message);
  } catch (error) {
    console.error('Error registering user:', error);
  };    

    // After successful submission, you can close the modal
    setShowModal(false);
    // Reset the form inputs if needed
    setFirstName("");
    setLastName("");
    setOtherName("");
    setEmail("");
    setDob(null);
    setGender("");
    setNationality("");
    setSelectedState("");
    setSelectedLga("");
    setAddress("");
    setAreaCode("");
    setPhoneNumber("");
    setFarmingType("");
    setIdentificationType("");
    setFile(null);
    setUserCategory("");

    // You can display a success message here if needed
    const isRegistrationSuccessful = true; // You may implement actual registration logic here

    if (isRegistrationSuccessful) {
      // Show toast notification
    alert("Registration completed successfully!", {
        onClose: () => {
          // Close the registration modal
          // Navigate back to sign-in
          navigate("/signin");
        },
      });
    }
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (
        allowedTypes.includes(selectedFile.type) &&
        selectedFile.size <= MAX_FILE_SIZE
      ) {
        setFile(selectedFile);
      } else {
        alert(
          "Please select a PNG or JPEG file that is not more than 500KB in size."
        );
        e.target.value = null; // Clear the selected file from the input
      }
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white justify-center items-center p-8 rounded-xl shadow-md   max-h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-4xl font-bold mb-2 text-center text-green-600">
              Registration
            </h1>
            <p className="text-xl mb-6 text-center">
              Use this form below to create your Account
            </p>
            <button
              className="absolute top-2 right-2 text-white"
              onClick={handleCloseModal}
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
            {/* Your form inputs and elements go here */}
            <form onSubmit={handleRegistration}>
              <div className=" grid-cols-1 gap-4 mb-4">
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
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                    placeholder="Enter your email Address..."
                    required
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
                      <option value="123">+234</option>
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
                <div className="col-span-1 mb-3">
                  <label
                    htmlFor="fileUpload"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Upload File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900 opacity-0 absolute top-0 left-0"
                    />
                    {file && <p className="mt-2 mb-2">{file.name}</p>}
                    <label
                      htmlFor="fileUpload"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
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
              </div>
            </form>
            <div className="flex justify-between item-center mt-8">
              <p className="text-gray-600 mt-3">
                Already have an Account?
                <Link to="/signin" className="text-blue-500">
                  Sign In
                </Link>
              </p>
              <button
                onClick={handleRegistration}
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Submit
              </button>
            </div>
            <div className="text-right"> 
              {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
