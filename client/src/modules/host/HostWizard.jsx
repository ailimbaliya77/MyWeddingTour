import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Couple", "Wedding", "Story", "Photos", "Review"];

const HostWizard = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    coupleNames: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    venue: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // ✅ adds wedding via App.jsx
    navigate("/weddings"); // ✅ redirect to weddings page
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Progress bar */}
      <div className="flex justify-between mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                i <= step
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
            <p className="mt-2 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Couple Details</h2>
            <input
              type="text"
              name="coupleNames"
              value={form.coupleNames}
              onChange={handleChange}
              placeholder="Couple Names"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Wedding Details</h2>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Story & Traditions</h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your wedding, culture, and traditions"
              rows="5"
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>
          </div>
        )}

        {/* Step 4 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Upload Photos / Video</h2>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste Image URL"
              className="w-full border p-3 rounded-lg"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Wedding Preview"
                className="w-full max-h-64 object-cover rounded-lg shadow"
              />
            )}
          </div>
        )}

        {/* Step 5 */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Review & Submit</h2>
            <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
              <p><strong>Couple:</strong> {form.coupleNames}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Date:</strong> {form.date}</p>
              <p><strong>Location:</strong> {form.location}</p>
              <p><strong>Venue:</strong> {form.venue}</p>
              <p><strong>Description:</strong> {form.description}</p>
              {form.image && (
                <img
                  src={form.image}
                  alt="Wedding Preview"
                  className="w-full max-h-64 object-cover rounded-lg shadow"
                />
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HostWizard;
