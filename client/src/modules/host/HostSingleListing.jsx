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
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      const res = await fetch(`${API_URL}/wedding/create-single`, {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, status: isDraft ? "draft" : "pending" }),
      });

      if (!res.ok) throw new Error("Failed to submit listing");

      navigate(isDraft ? "/host/dashboard" : "/host/success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong submitting your listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header — matches site nav */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
        <Link to="/" className="font-extrabold text-xl">
          <span className="text-orange-500">Ree</span>
          <span className="text-slate-800">waayat</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-medium text-sm">
          <Link to="/weddings" className="hover:text-slate-900">Weddings</Link>
          <Link to="/how-it-works" className="hover:text-slate-900">How It Works</Link>
          <Link to="/testimonials" className="hover:text-slate-900">Testimonials</Link>
          <Link to="/faqs" className="hover:text-slate-900">FAQs</Link>
          <Link to="/contact" className="hover:text-slate-900">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-slate-700 font-medium text-sm hidden sm:block">
            Login
          </Link>
          <Link
            to="/host/dashboard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition"
          >
            Become a Host
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
          List Your Wedding
        </h1>
        <p className="text-slate-500 text-center mb-10 leading-relaxed">
          Share your culture with the world. Please fill out the details below
          to start reviewing guest requests.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitListing(false);
          }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-200"
        >
          {/* 1. About the Couple */}
          <section className="p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">About the Couple</h2>
            <p className="text-sm text-slate-500 mb-6">Introduce yourselves to potential guests.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Bride's Name
                </label>
                <input
                  type="text"
                  name="brideName"
                  value={form.brideName}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.brideName && <p className="text-red-500 text-xs mt-1">{errors.brideName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Groom's Name
                </label>
                <input
                  type="text"
                  name="groomName"
                  value={form.groomName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.groomName && <p className="text-red-500 text-xs mt-1">{errors.groomName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Story</label>
              <textarea
                name="story"
                value={form.story}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us a little bit about how you met, your background, and what makes your wedding special..."
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.story && <p className="text-red-500 text-xs mt-1">{errors.story}</p>}
            </div>
          </section>

          {/* 2. Wedding Details */}
          <section className="p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Wedding Details</h2>
            <p className="text-sm text-slate-500 mb-6">Where and when is the celebration happening?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Wedding Location (City)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Venue Name (Optional)
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={form.venueName}
                  onChange={handleChange}
                  placeholder="e.g. The Leela Palace"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </section>

          {/* 3. Select Events */}
          <section className="p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Select Events</h2>
            <p className="text-sm text-slate-500 mb-6">Which ceremonies are open for guests to attend?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EVENT_OPTIONS.map((opt) => {
                const checked = form.events.includes(opt.key);
                return (
                  <label
                    key={opt.key}
                    className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition ${
                      checked
                        ? "border-teal-600 bg-teal-50"
                        : "border-slate-200 hover:border-teal-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEvent(opt.key)}
                      className="mt-1 w-4 h-4 accent-teal-600"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{opt.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.events && <p className="text-red-500 text-xs mt-2">{errors.events}</p>}
          </section>

          {/* 4. Hosting Preferences */}
          <section className="p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Hosting Preferences</h2>
            <p className="text-sm text-slate-500 mb-6">Set your availability and terms.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Guest Capacity
                </label>
                <select
                  name="guestCapacity"
                  value={form.guestCapacity}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>1-2 Guests</option>
                  <option>3-5 Guests</option>
                  <option>6-10 Guests</option>
                  <option>10+ Guests</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Price per Guest (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                  <input
                    type="number"
                    name="pricePerGuest"
                    value={form.pricePerGuest}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    className="w-full border border-slate-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                {errors.pricePerGuest && <p className="text-red-500 text-xs mt-1">{errors.pricePerGuest}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Special Instructions / Requirements
              </label>
              <textarea
                name="specialInstructions"
                value={form.specialInstructions}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Guests must dress modestly, no photography during main ritual..."
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-6 px-8 py-6">
            <button
              type="button"
              onClick={() => submitListing(true)}
              disabled={submitting}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 disabled:opacity-60 transition"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Submit Listing
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <footer className="text-center text-xs text-slate-400 py-8">
        © 2025 Reewaayat Inc. Your privacy is important to us.
      </footer>
    </div>
  );
};

export default HostSingleListing; 