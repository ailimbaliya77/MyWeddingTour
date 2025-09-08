import React from "react";
import { useNavigate } from "react-router-dom";

const HostStep4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

// Add new language
  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      guideLanguages: [...(prev.guideLanguages || []), ""],
    }));
  };

  // Update language field
  const handleLanguageChange = (index, value) => {
    const updated = [...(formData.guideLanguages || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, guideLanguages: updated }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/weddings/register/step5");
  };

  const handleBack = () => {
    navigate("/weddings/register/step3");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      {/* Step Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S GET YOU READY TO BECOME A HOST
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-slate-600">STEP 4</span> Nominate a Ceremony Guide
      </p>

      {/* Info Box: Who is the Ceremony Guide? */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p className="font-semibold mb-2">❓ Who is the Ceremony Guide?</p>
        <p>
          We recognize that couples are busy before and during the wedding, 
          therefore please appoint someone who can be asked on your behalf 
          to take care of your MyWeddingTour guests.
        </p>
      </div>

      {/* Info Box: What does a Ceremony Guide do? */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p className="font-semibold mb-2">💡 What does a Ceremony Guide do?</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            He/she gets in touch with confirmed guests at the wedding to make 
            arrangements based on guest needs (e.g., exact timing, location, dress code).
          </li>
          <li>
            He/she can be contacted by confirmed guests after booking to discuss 
            practical details (accommodation, shopping for traditional attire, etc.).
          </li>
          <li>
            He/she keeps in touch with confirmed guests regarding last-minute changes.
          </li>
          <li>
            He/she welcomes confirmed guests to the wedding and helps them be 
            part of the celebration.
          </li>
        </ul>
      </div>

      {/* Ceremony Guide Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceremony Guide's first name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="guideFirst"
            value={formData.guideFirst || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceremony Guide's last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="guideLast"
            value={formData.guideLast || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Email & Confirm Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceremony Guide's email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="guideEmail"
            value={formData.guideEmail || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceremony Guide's email address again <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="guideEmailConfirm"
            value={formData.guideEmailConfirm || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ceremony Guide's phone number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="guidePhone"
          value={formData.guidePhone || ""}
          onChange={handleChange}
          placeholder="+49123456789"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Relationship */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ceremony Guide's relationship to the couple <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="guideRelation"
          value={formData.guideRelation || ""}
          onChange={handleChange}
          placeholder="e.g. Bride's mom"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Spoken Languages */}
       {/* Spoken Languages - Dynamic */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ceremony Guide's spoken languages <span className="text-red-500">*</span>
        </label>

        {(formData.guideLanguages || [""]).map((lang, index) => (
          <input
            key={index}
            type="text"
            value={lang}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="e.g. English"
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
        ))}

        <button
          type="button"
          onClick={addLanguage}
          className="mt-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          + Add other language
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>

      {/* Back & Next Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HostStep4;
