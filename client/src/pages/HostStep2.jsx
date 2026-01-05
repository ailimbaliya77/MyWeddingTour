import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.couplePhoto) {
      newErrors.couplePhoto = "Couple photo is required";
    }

    if (!formData.storyDescription || formData.storyDescription.trim().length < 20) {
      newErrors.storyDescription = "Story must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoUpload = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type! Please upload JPG, PNG, WebP, or HEIC image.");
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      alert("File size must be under 12MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      couplePhoto: file,
    }));

    setErrors((prev) => ({ ...prev, couplePhoto: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = async () => {
  if (!validateStep2()) {
    alert("Please fix errors before continuing");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required");
    return;
  }

  const fd = new FormData();
  fd.append("weddingId", formData.weddingId);
  fd.append("couplePhoto", formData.couplePhoto);
  fd.append("storyDescription", formData.storyDescription);
  fd.append("youtube", formData.youtube || "");

  try {
    const res = await fetch("http://localhost:3000/api/v1/wedding/step-2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Step 2 failed");
      return;
    }

    navigate("/weddings/register/step3");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white px-10 py-10 shadow-xl rounded-2xl">

        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-1">
          Tell us more about your wedding story
        </h2>
        <p className="text-sm text-gray-600 mb-8">STEP 2 • Your story</p>

        {/* NOTICE BANNERS */}
        <div className="p-4 border bg-teal-50 rounded-xl text-gray-700 text-sm mb-6">
          📸 Please upload a photo of the to-be-married couple.  
          Accepted formats: <b>JPG, PNG, WebP, HEIC</b>. Max size: <b>12MB</b>.
        </div>

        <div className="p-4 border bg-red-50 rounded-xl text-red-700 text-sm mb-8">
          ⚠️ Do not upload photos showing exact wedding location (map/invitation).
          Such images will be rejected by admin.
        </div>

        {/* PHOTO UPLOAD */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Upload Feature Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={(e) => handlePhotoUpload(e.target.files[0])}
            className="w-full border px-3 py-2 rounded-lg"
          />
          {errors.couplePhoto && (
            <p className="text-red-500 text-xs mt-1">{errors.couplePhoto}</p>
          )}
        </div>

        {/* STORY */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Your Love Story <span className="text-red-500">*</span>
          </label>
          <textarea
            name="storyDescription"
            value={formData.storyDescription || ""}
            onChange={handleChange}
            rows="5"
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.storyDescription ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="How did you meet? What makes your story special?"
          ></textarea>
          {errors.storyDescription && (
            <p className="text-red-500 text-xs mt-1">{errors.storyDescription}</p>
          )}
        </div>

        {/* YOUTUBE VIDEO */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Engagement / Love Story Video (optional)
          </label>
          <input
            type="url"
            name="youtube"
            value={formData.youtube || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Paste YouTube link"
          />
        </div>

        {/* NEXT BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-10 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition transform hover:scale-105 active:scale-95"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostStep2;