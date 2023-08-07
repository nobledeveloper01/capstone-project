import React, { useState } from "react";
import axios from "axios";

const UploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        setMessage(`File "${file.name}" exceeds the 5MB size limit.`);
        continue;
      }
      previews.push({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      });
    }
    setSelectedFiles(Array.from(files));
    setFilePreviews(previews);
    setMessage("");
  };

  const handleFileUpload = () => {
    if (filePreviews.length === 0) {
      setMessage("Please select files to upload.");
      return;
    }

    setUploading(true);

    const uploadFile = async (file, index) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Replace "YOUR_UPLOAD_API_ENDPOINT" with your actual backend API endpoint for file upload
        const response = await axios.post("YOUR_UPLOAD_API_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const newPreviews = [...filePreviews];
            newPreviews[index].progress = progress;
            setFilePreviews(newPreviews);
          },
        });

        console.log("File upload response:", response.data);

        // If needed, you can handle the response from the server here
        // For example, update the progress or show success message

        // After the upload is completed, you can update the file preview progress to 100
        const newPreviews = [...filePreviews];
        newPreviews[index].progress = 100;
        setFilePreviews(newPreviews);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    };

    filePreviews.forEach((preview, index) => {
      // Perform the actual file upload logic here
      uploadFile(preview.file, index);
    });
  };
  return (
    <div className="ml-4 max-w-lg p-4 border-4 border-green-700 bg-white rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <p className="mb-4">
        Select multiple image files (not more than 5MB each) and click "Upload".
      </p>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <label className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer">
          Select Files
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button
          className="bg-green-500 text-white px-4 py-1 rounded"
          onClick={handleFileUpload}
          disabled={uploading || selectedFiles.length === 0}
        >
          Upload
        </button>
      </div>
      {filePreviews.length > 0 && (
        <div className="space-y-4">
          {filePreviews.map((preview, index) => (
            <div key={index}>
              <img
                src={preview.preview}
                alt={`Preview-${index}`}
                className="max-w-32 h-32 object-cover rounded"
              />
              {uploading && (
                <div className="mt-2 h-2 bg-gray-300 rounded">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${preview.progress}%` }}
                  />
                </div>
              )}
              <p className="text-sm text-gray-700 mt-2">
                {preview.file.name} ({(preview.file.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          ))}
        </div>
      )}
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default UploadImages;
