import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostFormPage = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    coupleNames: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // adds to weddings list
    navigate("/weddings"); // redirect back to weddings page
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Become a Host
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Share your wedding with friends & family. Fill in your details below to create your own wedding page.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        {/* Couple Names */}
        <div>
          <label className="block text-gray-700 font-medium">Couple Names</label>
          <input
            type="text"
            name="coupleNames"
            value={form.coupleNames}
            onChange={handleChange}
            required
            placeholder="e.g., Aditi & Rahul"
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="e.g., Udaipur, India"
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium">Wedding Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Tell guests about your wedding..."
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste an image URL"
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          Create Wedding Page
        </button>
      </form>
    </div>
  );
};

export default HostFormPage;
