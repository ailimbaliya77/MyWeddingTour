import React from "react";
import { useNavigate } from "react-router-dom";

const HostStep1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async () => {
    const token = localStorage.getItem("token");

    // 🔥 STOP if user is not logged in
    if (!token) {
      alert("You must be logged in to continue. Please log in first.");
      return;
    }

    // 🔥 Basic validation before API call
    if (
      !formData.brideFirst ||
      !formData.brideLast ||
      !formData.groomFirst ||
      !formData.groomLast ||
      !formData.email ||
      !formData.phone
    ) {
      alert("All fields are required before proceeding.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/wedding/step-1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          brideFirst: formData.brideFirst,
          brideLast: formData.brideLast,
          groomFirst: formData.groomFirst,
          groomLast: formData.groomLast,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save weddingId returned from backend
        setFormData({ ...formData, weddingId: data.weddingId });

        alert("Step 1 saved successfully!");
        navigate("/weddings/register/step2");
      } else {
        alert(data.message || "Failed to save details");
      }
    } catch (error) {
      console.error("Step 1 Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S GET YOU READY TO BECOME A HOST
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-teal-600">STEP 1</span> About you
      </p>

      {/* INFO BOX */}
      <div className="bg-blue-50 border border-blue-200 p-4 mb-6 rounded-lg text-sm text-gray-700">
        Your details are needed for identification and contact purposes.
      </div>

      {/* Bride Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-3">
          👰 Bride Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              name="brideFirst"
              value={formData.brideFirst}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input
              type="text"
              name="brideLast"
              value={formData.brideLast}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Groom Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-3">🤵 Groom Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              name="groomFirst"
              value={formData.groomFirst}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input
              type="text"
              name="groomLast"
              value={formData.groomLast}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-3">📞 Contact Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="+91 9876543210"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HostStep1;
