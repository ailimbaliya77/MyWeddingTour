import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [couplePhoto, setCouplePhoto] = useState(null);
  const [storyDescription, setStoryDescription] = useState("");

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (!couplePhoto || !storyDescription) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to continue.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("couplePhoto", couplePhoto);
      fd.append("storyDescription", storyDescription);
      fd.append("weddingId", formData.weddingId); 

      const res = await fetch("http://localhost:3000/api/v1/wedding/step-2", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
  alert("Step 2 saved successfully!");
  navigate("/weddings/register/step3");
} else {
  console.warn("Ignoring Step 2 save error:", data.message);
  navigate("/weddings/register/step3");   // ← FORCE NAVIGATION
}

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S GET YOU READY TO BECOME A HOST
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-slate-600">STEP 2</span> Tell us more about yourselves
      </p>

      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p>
          📸 Please upload a photo of the to-be-married couple here, ideally from a pre-wedding photography session. 
          Don’t have a picture of them together? You can merge two individual photos or take a picture while one of them is on camera (e.g., Zoom, Google Meet, Skype, etc.). 
          Please make sure this photo is not uploaded to any other platforms, so we can promote your wedding with this unique picture.
        </p>
        <p className="mt-2">
          Accepted image formats: <b>JPEG (.jpg, .jpeg)</b>, <b>PNG (.png)</b>, <b>HEIC (.heic)</b>, and <b>WebP (.webp)</b>.  
          Max file size: <b>12 MB</b>.
        </p>
      </div>

      <div className="mb-6 p-4 border rounded-lg bg-red-50 text-sm text-red-700">
        ⚠️ Do not upload an image that explicitly depicts the exact location of your wedding. 
        This includes maps or wedding invitation cards that reveal the specific address. 
        Wedding images are public and visible to all site visitors. Location-revealing images may attract non-paying visitors.  
        Registrations with such images may be rejected by administrators.
      </div>

      {/* Upload Photo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload a photo to be used as feature image on your listing <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          onChange={(e) => setCouplePhoto(e.target.files[0])}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      {/* Story Description */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          Your Love Story *
        </label>
        <div className="p-4 border rounded-lg bg-gray-50 text-sm text-gray-700 mb-3">
          💡 We would love to know more about the two of you! Share your story, how you got to know each other, what you do for a living, how old you are, and everything you find important.  
          Also, you can encourage future guests to attend your wedding by inviting them with your own kind words or quotes.
        </div>
        <textarea
          name="story"
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          rows="5"
          placeholder="Write your wedding story here..."
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a (engagement) video you would like to share with potential guests?
        </label>
        <p className="text-sm text-gray-600 mb-2">
          🎥 A video on YouTube helps travelers to get to know you better and decide to join your wedding.  
          See how the first MyWeddingTour host couple invited their future guests!
        </p>
        <input
          type="url"
          name="youtube"
          value={formData.youtube || ""}
          onChange={handleChange}
          placeholder="Copy YouTube link here"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        Next
      </button>
    </div>
  );
};

export default HostStep2;
