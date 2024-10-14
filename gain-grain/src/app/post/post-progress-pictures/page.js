"use client";

import React, { useState } from 'react';

export default function UploadProgressPicture() {
  const [progressPic, setProgressPic] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProgressPic(file);
    }
  };

  const handleUpload = async () => {
    if (!progressPic) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      console.log("File ready to upload:", progressPic);

      alert('Progress picture uploaded successfully!');
    } catch (err) {
      setError('Failed to upload file.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Upload Progress Picture</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="mt-4">
        <label className="text-lg">Progress Picture: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />
      </div>

      <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Upload
      </button>
    </div>
  );
}
