import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState(formData.role || "Bride");
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    const [parent, child] = name.split(".");
    if (child) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // Validate based on role
    if (role === "Bride") {
      if (!formData.bride.firstName?.trim())
        newErrors["bride.firstName"] = "Bride's first name is required";
      if (!formData.bride.lastName?.trim())
        newErrors["bride.lastName"] = "Bride's last name is required";
      if (!formData.bride.phone?.trim())
        newErrors["bride.phone"] = "Bride's phone is required";
      if (!formData.groom.firstName?.trim())
        newErrors["groom.firstName"] = "Partner's first name is required";
      if (!formData.groom.lastName?.trim())
        newErrors["groom.lastName"] = "Partner's last name is required";
      if (!formData.groom.email?.trim())
        newErrors["groom.email"] = "Partner's email is required";
      if (!formData.groom.phone?.trim())
        newErrors["groom.phone"] = "Partner's phone is required";
    } else if (role === "Groom") {
      if (!formData.groom.firstName?.trim())
        newErrors["groom.firstName"] = "Groom's first name is required";
      if (!formData.groom.lastName?.trim())
        newErrors["groom.lastName"] = "Groom's last name is required";
      if (!formData.groom.phone?.trim())
        newErrors["groom.phone"] = "Groom's phone is required";
      if (!formData.bride.firstName?.trim())
        newErrors["bride.firstName"] = "Partner's first name is required";
      if (!formData.bride.lastName?.trim())
        newErrors["bride.lastName"] = "Partner's last name is required";
      if (!formData.bride.email?.trim())
        newErrors["bride.email"] = "Partner's email is required";
      if (!formData.bride.phone?.trim())
        newErrors["bride.phone"] = "Partner's phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleNext = async () => {
  if (!validateForm()) {
    alert("Please fill all required fields");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login required");
    navigate("/");
    return;
  }

const primaryPerson = role === "Bride" ? formData.bride : formData.groom;

  try {
    const step1Data = {
      bride: {
        firstName: formData.bride.firstName,
        lastName: formData.bride.lastName,
      },
      groom: {
        firstName: formData.groom.firstName,
        lastName: formData.groom.lastName,
      },
      weddingEmail: primaryPerson.email,
      phone: primaryPerson.phone,
    };

    const res = await fetch("http://localhost:3000/api/v1/wedding/step-1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(step1Data),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Step 1 failed");
      return;
    }

    setFormData((prev) => ({
  ...prev,
  weddingId: data.data._id,
}));


    navigate("/weddings/register/step2"); 
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white px-10 py-10 shadow-xl rounded-2xl">
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-1">
          Hi! Let's get you ready to become a host
        </h2>
        <p className="text-sm text-gray-600 mb-8">STEP 1 • About you</p>

        {/* WHO ARE YOU */}
        <label className="block text-lg font-semibold mb-2">
          Who are you? <span className="text-red-500">*</span>
        </label>

        <select
          className="w-64 border px-4 py-2 rounded-lg mb-8 bg-teal-600 text-white font-medium cursor-pointer hover:bg-teal-700 transition"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Bride">Bride</option>
          <option value="Groom">Groom</option>
          <option value="Other">Other</option>
        </select>

        {/* CONTACT DETAILS TITLE */}
        <h3 className="text-xl font-semibold mb-3">Your contact details</h3>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ===== YOU - DETAILS ===== */}

          <div>
            <label className="block mb-1 font-medium">
              {role}'s First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "bride.firstName" : "groom.firstName"}
              value={
                role === "Bride"
                  ? formData.bride.firstName
                  : formData.groom.firstName
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "bride.firstName" : "groom.firstName"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter first name"
            />
            {errors[role === "Bride" ? "bride.firstName" : "groom.firstName"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "bride.firstName" : "groom.firstName"]}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {role}'s Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "bride.lastName" : "groom.lastName"}
              value={
                role === "Bride"
                  ? formData.bride.lastName
                  : formData.groom.lastName
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "bride.lastName" : "groom.lastName"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter last name"
            />
            {errors[role === "Bride" ? "bride.lastName" : "groom.lastName"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "bride.lastName" : "groom.lastName"]}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {role}'s Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name={role === "Bride" ? "bride.email" : "groom.email"}
              value={role === "Bride" ? formData.bride.email : formData.groom.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {role}'s Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "bride.phone" : "groom.phone"}
              value={
                role === "Bride" ? formData.bride.phone : formData.groom.phone
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "bride.phone" : "groom.phone"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="+91 1234567890"
            />
            {errors[role === "Bride" ? "bride.phone" : "groom.phone"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "bride.phone" : "groom.phone"]}
              </p>
            )}
          </div>

          {/* ===== PARTNER DETAILS ===== */}

          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4 mt-4">
              Partner's Details
            </h3>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Partner's First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "groom.firstName" : "bride.firstName"}
              value={
                role === "Bride"
                  ? formData.groom.firstName
                  : formData.bride.firstName
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "groom.firstName" : "bride.firstName"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter partner's first name"
            />
            {errors[role === "Bride" ? "groom.firstName" : "bride.firstName"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "groom.firstName" : "bride.firstName"]}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Partner's Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "groom.lastName" : "bride.lastName"}
              value={
                role === "Bride"
                  ? formData.groom.lastName
                  : formData.bride.lastName
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "groom.lastName" : "bride.lastName"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter partner's last name"
            />
            {errors[role === "Bride" ? "groom.lastName" : "bride.lastName"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "groom.lastName" : "bride.lastName"]}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Partner's Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name={role === "Bride" ? "groom.email" : "bride.email"}
              value={
                role === "Bride" ? formData.groom.email : formData.bride.email
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "groom.email" : "bride.email"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="partner@example.com"
            />
            {errors[role === "Bride" ? "groom.email" : "bride.email"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "groom.email" : "bride.email"]}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Partner's Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={role === "Bride" ? "groom.phone" : "bride.phone"}
              value={
                role === "Bride" ? formData.groom.phone : formData.bride.phone
              }
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                errors[role === "Bride" ? "groom.phone" : "bride.phone"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="+91 1234567890"
            />
            {errors[role === "Bride" ? "groom.phone" : "bride.phone"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[role === "Bride" ? "groom.phone" : "bride.phone"]}
              </p>
            )}
          </div>
        </div>

        {/* TRUST BANNER */}
        <div className="p-4 border bg-teal-50 rounded-xl text-gray-700 text-sm mt-8">
          🔒 We never share your private details. Only first names are visible
          publicly.
        </div>

        {/* NEXT BUTTON */}
        <div className="flex justify-end mt-10">
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

export default HostStep1;