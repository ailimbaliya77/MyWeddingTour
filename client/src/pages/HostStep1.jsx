import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(formData.role || "Bride");

  const [parent, child] = name.split(".");

  setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [child]: value,
      },
    });
  };

  // Auto-label based on role
  const getLabels = () => {
    if (role === "Bride") {
      return {
        you: "Bride",
        partner: "Groom",
      };
    } else if (role === "Groom") {
      return {
        you: "Groom",
        partner: "Bride",
      };
    } else {
      return {
        you: "Partner 1",
        partner: "Partner 2",
      };
    }
  };


  
  const labels = getLabels();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleNext = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to continue.");
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
          bride: {
            firstName: formData.bride.firstName,
            lastName: formData.bride.lastName,
          },
          groom: {
            firstName: formData.groom.firstName,
            lastName: formData.groom.lastName,
          },
          weddingEmail: formData.weddingEmail,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({ ...formData, weddingId: data.weddingId });
        alert("Step 1 saved!");
        navigate("/weddings/register/step2");
      } else {
        alert(data.message || "Failed to save data");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white px-10 py-10 shadow-xl rounded-2xl">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-black-800 mb-1">
        Hi! Letʼs get you ready to become a host
      </h2>
      <p className="text-sm text-black-500 mb-8">STEP 1 • About you</p>

      {/* WHO ARE YOU */}
      <label className="block text-lg font-semibold text-black-700 mb-2">
        Who are you? *
      </label>

      <select
        className="w-64 border border-black-300 px-4 py-2 rounded-lg shadow-sm mb-8 bg-teal-600 text-white font-medium"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Bride">Bride</option>
        <option value="Groom">Groom</option>
        <option value="Other">Other</option>
      </select>

      {/* CONTACT DETAILS */}
      <h3 className="text-xl font-semibold text-black-800 mb-3">
        Your contact details
      </h3>

      {/* Info Banner */}
      <div className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-black-700 text-sm mb-8 flex items-start gap-3">
        <div className="text-teal-600 text-lg mt-1">ℹ️</div>
        <p>
          Your details are needed for identification and to contact you if needed.
          We have pre-filled this information based on your login details. Your
          wedding listing will show only your first names publicly. All other personal
          details remain private and shared only when necessary.
        </p>
      </div>

      {/* FORM START */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* YOU – First Name */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.you}ʼs first name *
          </label>
          <input
            type="text"
            name="yourFirst"
            value={formData.yourFirst || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* YOU – Last Name */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.you}ʼs last name *
          </label>
          <input
            type="text"
            name="yourLast"
            value={formData.yourLast || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* YOU – Email */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.you}ʼs email *
          </label>
          <input
            type="email"
            name="yourEmail"
            value={formData.yourEmail || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-black-100"
          />
        </div>

        {/* YOU – Phone */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.you}ʼs phone number including country code *
          </label>
          <input
            type="text"
            name="yourPhone"
            value={formData.yourPhone || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* PARTNER – First Name */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.partner}ʼs first name *
          </label>
          <input
            type="text"
            name="partnerFirst"
            value={formData.partnerFirst || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* PARTNER – Last Name */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.partner}ʼs last name *
          </label>
          <input
            type="text"
            name="partnerLast"
            value={formData.partnerLast || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* PARTNER – Email */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.partner}ʼs email *
          </label>
          <input
            type="email"
            name="partnerEmail"
            value={formData.partnerEmail || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* PARTNER – Phone */}
        <div>
          <label className="block text-black-700 text-sm mb-1">
            {labels.partner}ʼs phone number *
          </label>
          <input
            type="text"
            name="partnerPhone"
            value={formData.partnerPhone || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      {/* TRUST BANNER */}
      <div className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-black-700 text-sm mt-8 flex items-start gap-3">
        <div className="text-teal-600 text-lg mt-1">🔒</div>
        <p>
          We promise not to spam you or your family. Your details are protected
          and will only be used for communication regarding hosting your wedding
          experience on our platform.
        </p>
      </div>

      {/* NEXT BUTTON */}
      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
          className="px-10 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700"
        >
          Next
        </button>
      </div>

    </div> 
  );
};

export default HostStep1;
