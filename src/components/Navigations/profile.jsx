import React, { useState, useEffect } from "react";
import Header from "../Header";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    // Add other credential fields here
  });

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("API_ENDPOINT_TO_GET_USER_PROFILE");
        setUserData(response.data);
        setEditedUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // Handle profile picture upload
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePicture(file);
  };

  const handleProfilePictureUpload = async () => {
    if (!newProfilePicture) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", newProfilePicture);
    try {
      await axios.post("API_ENDPOINT_TO_UPLOAD_PROFILE_PICTURE", formData);
      // Refresh user data after successful upload
      const response = await axios.get("API_ENDPOINT_TO_GET_USER_PROFILE");
      setUserData(response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
    setIsUploading(false);
  };

  // Handle credential changes
  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Send the edited user data to the backend to update credentials
      await axios.put("API_ENDPOINT_TO_UPDATE_CREDENTIALS", editedUserData);
      setUserData(editedUserData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-white p-4 rounded-md shadow-md">
            {userData && (
              <>
                {/* Profile Picture */}
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                {/* Upload New Profile Picture */}
                {editMode ? (
                  <>
                    <label className="text-blue-600 cursor-pointer mb-4">
                      {isUploading ? "Uploading..." : "Change Profile Picture"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={handleProfilePictureUpload}
                    >
                      Upload
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile Picture
                  </button>
                )}
                {editMode ? (
                  <>
                    {/* Edit Mode: Input fields for credentials */}
                    <input
                      type="text"
                      name="name"
                      value={editedUserData.name}
                      onChange={handleCredentialChange}
                      className="w-full border rounded-md px-2 py-1 my-2"
                    />
                    {/* Add other credential fields here */}
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        setEditMode(false);
                        setEditedUserData(userData);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {/* View Mode: Display user credentials */}
                    <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                    {/* Display other credentials here */}
                  </>
                )}
              </>
            )}
          </div>
          {/* Learning Center (You can add more content here) */}
          <div className="md:col-span-2 bg-white p-4 rounded-md shadow-md">
            {/* Your content goes here */}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProfilePage;
