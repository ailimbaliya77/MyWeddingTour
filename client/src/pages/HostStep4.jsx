import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Add language
  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      guideSpokenLanguages: [...(prev.guideSpokenLanguages || []), ""],
    }));
  };

  // Update language
  const handleLanguageChange = (index, value) => {
    const updated = [...(formData.guideSpokenLanguages || [])];
    updated[index] = value;

    setFormData((prev) => ({ ...prev, guideSpokenLanguages: updated }));
  };

  // Update normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateStep4 = () => {
    const newErrors = {};

    if (!formData.guideFirstName) newErrors.guideFirstName = "First name is required";
    if (!formData.guideLastName) newErrors.guideLastName = "Last name is required";
    if (!formData.guideEmail) newErrors.guideEmail = "Email is required";
    if (formData.guideEmail !== formData.guideEmailConfirm)
      newErrors.guideEmailConfirm = "Emails do not match";

    if (!formData.guidePhoneNumber) newErrors.guidePhoneNumber = "Phone is required";
    if (!formData.guideCoupleRelation) newErrors.guideCoupleRelation = "Relation required";

    const langs = formData.guideSpokenLanguages || [];
    if (!langs.length || !langs[0])
      newErrors.guideSpokenLanguages = "At least 1 language required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Step 4
  const handleNext = async () => {
    if (!validateStep4()) {
      alert("Please fix errors before continuing.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to continue.");
      return;
    }

    try {
      const bodyData = {
        weddingId: formData.weddingId,
        guideFirstName: formData.guideFirstName,
        guideLastName: formData.guideLastName,
        guideEmail: formData.guideEmail,
        guidePhoneNumber: formData.guidePhoneNumber,
        guideCoupleRelation: formData.guideCoupleRelation,
        guideSpokenLanguages: formData.guideSpokenLanguages || [],
      };

      const res = await fetch("http://localhost:3000/api/v1/wedding/step-4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Step 4 failed");
        return;
      }

      navigate("/weddings/register/step5");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // Back to Step 3
  const handleBack = () => {
    navigate("/weddings/register/step3");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-1">
        Hi {formData.brideFirst || "Host"}, nominate a ceremony guide
      </h2>
      <p className="text-sm text-gray-500 mb-6">STEP 4 • Ceremony Guide Details</p>

      {/* Guide First/Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1">Guide First Name *</label>
          <input
            type="text"
            name="guideFirstName"
            value={formData.guideFirstName || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.guideFirstName && <p className="text-red-600 text-xs">{errors.guideFirstName}</p>}
        </div>

        <div>
          <label className="block mb-1">Guide Last Name *</label>
          <input
            type="text"
            name="guideLastName"
            value={formData.guideLastName || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.guideLastName && <p className="text-red-600 text-xs">{errors.guideLastName}</p>}
        </div>
      </div>

      {/* Email & Confirm Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1">Guide Email *</label>
          <input
            type="email"
            name="guideEmail"
            value={formData.guideEmail || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.guideEmail && <p className="text-red-600 text-xs">{errors.guideEmail}</p>}
        </div>

        <div>
          <label className="block mb-1">Confirm Guide Email *</label>
          <input
            type="email"
            name="guideEmailConfirm"
            value={formData.guideEmailConfirm || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.guideEmailConfirm && (
            <p className="text-red-600 text-xs">{errors.guideEmailConfirm}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block mb-1">Guide Phone Number *</label>
        <input
          type="tel"
          name="guidePhoneNumber"
          value={formData.guidePhoneNumber || ""}
          onChange={handleChange}
          placeholder="+911234567890"
          className="w-full border rounded px-3 py-2"
        />
        {errors.guidePhoneNumber && (
          <p className="text-red-600 text-xs">{errors.guidePhoneNumber}</p>
        )}
      </div>

      {/* Relationship */}
      <div className="mb-6">
        <label className="block mb-1">Guide-Couple Relationship *</label>
        <input
          type="text"
          name="guideCoupleRelation"
          value={formData.guideCoupleRelation || ""}
          onChange={handleChange}
          placeholder="e.g. Brother, Aunt"
          className="w-full border rounded px-3 py-2"
        />
        {errors.guideCoupleRelation && (
          <p className="text-red-600 text-xs">{errors.guideCoupleRelation}</p>
        )}
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="block mb-2">Guide Spoken Languages *</label>

        {(formData.guideSpokenLanguages || [""]).map((lang, index) => (
          <input
            key={index}
            type="text"
            value={lang}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="e.g. English"
            className="w-full border rounded px-3 py-2 mb-2"
          />
        ))}

        <button
          type="button"
          onClick={addLanguage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Language
        </button>

        {errors.guideSpokenLanguages && (
          <p className="text-red-600 text-xs mt-1">{errors.guideSpokenLanguages}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="px-6 py-2 bg-gray-300 rounded">
          Back
        </button>
        <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded">
          Continue
        </button>
      </div>
    </div>
  );
};

export default HostStep4;
