import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EVENT_OPTIONS = [
  {
    key: "mainWedding",
    label: "Main Wedding (Pheras)",
    desc: "The traditional marriage ceremony.",
  },
  {
    key: "sangeet",
    label: "Sangeet Night",
    desc: "Musical night with dance & performances.",
  },
  {
    key: "haldi",
    label: "Haldi Ceremony",
    desc: "Turmeric application ritual.",
  },
  {
    key: "mehndi",
    label: "Mehndi",
    desc: "Henna application for bride & guests.",
  },
];

const HostSingleListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    story: "",
    location: "",
    venueName: "",
    startDate: "",
    endDate: "",
    events: ["mainWedding"],
    guestCapacity: "1-2 Guests",
    pricePerGuest: "",
    specialInstructions: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleEvent = (key) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(key)
        ? prev.events.filter((k) => k !== key)
        : [...prev.events, key],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.brideName.trim()) newErrors.brideName = "Bride's name is required";
    if (!form.groomName.trim()) newErrors.groomName = "Groom's name is required";
    if (!form.story.trim() || form.story.trim().length < 20)
      newErrors.story = "Story must be at least 20 characters";
    if (!form.location.trim()) newErrors.location = "Wedding location is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    if (!form.events.length) newErrors.events = "Select at least one event";
    if (!form.pricePerGuest) newErrors.pricePerGuest = "Price per guest is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitListing = async (isDraft) => {
    if (!isDraft && !validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/listings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: isDraft ? "draft" : "pending" }),
      });

      if (!res.ok) throw new Error("Failed to submit listing");

      navigate(isDraft ? "/host/dashboard" : "/host/submission-success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong submitting your listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
        <Link to="/" className="font-extrabold text-2xl">
          <span className="text-orange-500">Ree</span>
          <span className="text-gray-800">waayat</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium text-base">
          <Link to="/weddings" className="hover:text-gray-900">Weddings</Link>
          <Link to="/how-it-works" className="hover:text-gray-900">How It Works</Link>
          <Link to="/testimonials" className="hover:text-gray-900">Testimonials</Link>
          <Link to="/faqs" className="hover:text-gray-900">FAQs</Link>
          <Link to="/contact" className="hover:text-gray-900">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-700 font-medium text-base hidden sm:block">
            Login
          </Link>
          <Link
            to="/host/dashboard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-6 py-3 rounded-lg transition"
          >
            Become a Host
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">
          List Your Wedding
        </h1>
        <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
          Share your culture with the world. Please fill out the details below
          to start reviewing guest requests.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitListing(false);
          }}
          className="bg-white rounded-xl shadow-md divide-y divide-gray-100"
        >
          {/* 1. About the Couple */}
          <section className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">About the Couple</h2>
            <p className="text-sm text-gray-600 mb-6">Introduce yourselves to potential guests.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Bride's Name
                </label>
                <input
                  type="text"
                  name="brideName"
                  value={form.brideName}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
                {errors.brideName && <p className="text-red-500 text-xs mt-1">{errors.brideName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Groom's Name
                </label>
                <input
                  type="text"
                  name="groomName"
                  value={form.groomName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
                {errors.groomName && <p className="text-red-500 text-xs mt-1">{errors.groomName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Story</label>
              <textarea
                name="story"
                value={form.story}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us a little bit about how you met, your background, and what makes your wedding special..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
              {errors.story && <p className="text-red-500 text-xs mt-1">{errors.story}</p>}
            </div>
          </section>

          {/* 2. Wedding Details */}
          <section className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Wedding Details</h2>
            <p className="text-sm text-gray-600 mb-6">Where and when is the celebration happening?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Wedding Location (City)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Venue Name (Optional)
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={form.venueName}
                  onChange={handleChange}
                  placeholder="e.g. The Leela Palace"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </section>

          {/* 3. Select Events */}
          <section className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Select Events</h2>
            <p className="text-sm text-gray-600 mb-6">Which ceremonies are open for guests to attend?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EVENT_OPTIONS.map((opt) => {
                const checked = form.events.includes(opt.key);
                return (
                  <label
                    key={opt.key}
                    className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition ${
                      checked
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        toggleEvent(opt.key);
                      }}
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        checked
                          ? "bg-orange-500 border-orange-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.events && <p className="text-red-500 text-xs mt-2">{errors.events}</p>}
          </section>

          {/* 4. Hosting Preferences */}
          <section className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Hosting Preferences</h2>
            <p className="text-sm text-gray-600 mb-6">Set your availability and terms.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Guest Capacity
                </label>
                <select
                  name="guestCapacity"
                  value={form.guestCapacity}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                >
                  <option>1-2 Guests</option>
                  <option>3-5 Guests</option>
                  <option>6-10 Guests</option>
                  <option>10+ Guests</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Price per Guest (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    type="number"
                    name="pricePerGuest"
                    value={form.pricePerGuest}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                  />
                </div>
                {errors.pricePerGuest && <p className="text-red-500 text-xs mt-1">{errors.pricePerGuest}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Special Instructions / Requirements
              </label>
              <textarea
                name="specialInstructions"
                value={form.specialInstructions}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Guests must dress modestly, no photography during main ritual..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-6 px-8 py-6">
            <button
              type="button"
              onClick={() => submitListing(true)}
              disabled={submitting}
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white rounded-full text-sm font-bold shadow-lg disabled:opacity-60 transition"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostSingleListing;