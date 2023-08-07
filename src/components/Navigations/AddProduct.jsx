import React, { useState, useEffect } from "react";
import Header from "../Header";
import UploadImages from "../UploadImages";
import axios from "axios";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [address, setAddress] = useState("");
  const [lgas, setLgas] = useState([]);
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !product ||
      !selectedCategory ||
      !selectedSubcategory ||
      !price ||
      !description ||
      !sellerContact ||
      !address ||
      !selectedState ||
      !selectedLga ||
      !tags
    ) {
      setError("Please fill all fields.");
      return;
    }
    
    // Create a data object with the form values to send to the backend
  const data = {
    product,
    category: selectedCategory,
    subcategory: selectedSubcategory,
    price,
    description,
    sellerContact,
    address,
    state: selectedState,
    lga: selectedLga,
    tags,
  };

  // Make a POST request to your backend API to save the data
  axios
    .post("YOUR_BACKEND_API_URL", data)
    .then((response) => {
      console.log("Product submitted:", response.data);
      alert("Your have successfully added your product");
      navigate("/home");
    })
    .catch((error) => {
      console.error("Error submitting product:", error);
    });
};
 
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset the selected local government when the category changes
  };
  
  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value); // Update selected subcategory state
  };

  useEffect(() => {
    // Fetch subcategories data from the API based on the selected category
    if (selectedCategory) {
      axios
        .get(
          "https://raw.githubusercontent.com/Godspraise01/state-lga/main/subcategories.json"
        )
        .then((response) => {
          const categoryData = response.data;
          const selectedCategoryData = categoryData.find (
            (categoryData) => categoryData.category === selectedCategory
          );
          if (selectedCategoryData && selectedCategoryData.subcategories){
            setSubCategories(selectedCategoryData.subcategories);
          }else {
            setSubCategories([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching subcategories data:", error);
        });
    }
  }, [selectedCategory]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedLga(""); // Reset the selected local government when the state changes
  };

  const handleLgaChange = (e) => {
    setSelectedLga(e.target.value);
  };

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


  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl py-4 px-4 text-white bg-gray-600 font-bold mb-8 mx-0">
          Add Product
        </h1>

        <div className="flex flex-col md:flex-row md:mb-5">
          {/* First div for image upload */}
          <div className="md:w-1/2 ">
            <UploadImages />
          </div>
          {/* Second div for product details */}
          <div className="flex flex-col md:w-1/2 p-4 border-4 border-green-700 bg-white rounded-xl shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-5 py-3 px-4 ">
              {/* Product Name */}
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name*
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter your product..."
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category*
                </label>
                <select
                  type="text"
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  required
                >
                  <option value="">Select category</option>
                  <option value="bird">Bird</option>
                  <option value="crop">Crop</option>
                  <option value="feeds">Feeds</option>
                  <option value="chemicals">Chemicals</option>
                  <option value="vegetables">Vegetable</option>
                  <option value="tubers">Tubers</option>
                  <option value="grain">Grains</option>
                  <option value="liveStocks">LiveStocks</option>
                  {/* Add more user categories here if needed */}
                </select>
              </div>

              {/* Subcategory */}
              <div className="mb-4">
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subcategory*
                </label>
                <select
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  required
                >
                  <option value="">Select subcategory</option>
                  {subCategories.map((subCategories) => (
                    <option key={subCategories} value={subCategories}>
                      {subCategories}
                    </option>
                  ))}
                </select>
              </div>
              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (in Naira)*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter your product Price..."
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter product Description..."
                  required
                />
              </div>

              {/* Seller Contacts */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seller Contact*
                </label>
                <input
                  type="number"
                  id="phone number"
                  name="phone number"
                  value={sellerContact}
                  onChange={(e) => setSellerContact(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter your contact..."
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seller Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter your Address..."
                  required
                />
              </div>

              {/* State */}
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State*
                </label>
                <select
                  type="text"
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  required
                >
                  <option value="">- Select State -</option>
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

              {/* Local Government */}
              <div className="mb-4">
                <label
                  htmlFor="localGovernment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Local Government*
                </label>
                {/* Replace this with a dropdown menu or an input with API-based auto-suggestions */}
                <select
                  type="text"
                  id="localGovernment"
                  name="localGovernment"
                  value={selectedLga}
                  onChange={handleLgaChange}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  required
                >
                  <option value="">- Select Lga -</option>
                  {lgas.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags (separated by commas)*
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={product.tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-green-600 rounded-xl focus:outline-none focus:border-green-900"
                  placeholder="Enter your Tag e.g (Broiler, Layer, White yam, Yellow yam etc)"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                  onClick={handleSubmit}
                >
                  Publish Product
                </button>
              </div>
              <div className="text-right">
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
