import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, ImagePlus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EVENT_OPTIONS = [
  {
    key: "main",
    ritualName: "Phera",
    eventName: "Main wedding",
    description: "The traditional marriage ceremony.",
    default: true,
  },
  {
    key: "sangeet",
    ritualName: "Sangeet",
    eventName: "Sangeet night",
    description: "Musical night with dance & performances.",
  },
  {
    key: "haldi",
    ritualName: "Haldi",
    eventName: "Haldi ceremony",
    description: "Turmeric application ritual.",
  },
  {
    key: "mehndi",
    ritualName: "Mehndi",
    eventName: "Mehndi",
    description: "Henna application for bride & guests.",
  },
];

const RELIGION_OPTIONS = ["Hindu", "Sikh", "Christian", "Muslim", "Modern", "Other"];

const initialForm = {
  brideFirstName: "",
  brideLastName: "",
  groomFirstName: "",
  groomLastName: "",
  weddingEmail: "",
  phone: "",
  religion: "",
  storyDescription: "",
  city: "",
  region: "",
  country: "",
  venueName: "",
  weddingStartDate: "",
  weddingEndDate: "",
  guestCapacity: "2",
  pricePerPerson: "",
  extraNotes: "",
};

export default function HostSingleListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [selectedEvents, setSelectedEvents] = useState(
    EVENT_OPTIONS.filter((e) => e.default).map((e) => e.key)
  );
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEvent = (key) => {
    setSelectedEvents((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handlePhoto = (file) => {
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!form.brideFirstName.trim() || !form.brideLastName.trim())
      return "Bride's full name is required.";
    if (!form.groomFirstName.trim() || !form.groomLastName.trim())
      return "Groom's full name is required.";
    if (!form.weddingEmail.trim() || !form.phone.trim())
      return "A contact email and phone number are required.";
    if (!form.city.trim()) return "Wedding location (city) is required.";
    if (!form.weddingStartDate) return "Start date is required.";
    if (!photo) return "Please upload a couple photo.";
    if (form.storyDescription.trim().length < 20)
      return "Your story should be at least 20 characters.";
    if (selectedEvents.length === 0)
      return "Select at least one event guests can attend.";
    return "";
  };

  const refreshAccessToken = async () => {
    try {
      // Try cookie-based refresh first
      let res = await fetch(`${API_URL}/auth/refresh`, {
        method: "GET",
        credentials: "include",
      });

      // Fallback: send stored refresh token in body if cookie didn't work
      if (!res.ok) {
        const storedRefresh = localStorage.getItem("refreshToken");
        if (storedRefresh) {
          res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ refreshToken: storedRefresh }),
          });
        }
      }

      if (!res.ok) return null;
      const data = await res.json();
      const newToken = data?.data?.accessToken;
      if (newToken) localStorage.setItem("accessToken", newToken);
      return newToken || null;
    } catch {
      return null;
    }
  };

  // Wraps fetch with Bearer auth; on an expired/invalid token it silently
  // refreshes via the refresh-token cookie and retries the request once.
  const authFetch = async (url, options, tokenRef) => {
    const buildOptions = (tok) => ({
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${tok}`,
      },
    });

    let res = await fetch(url, buildOptions(tokenRef.current));
    let data = await res.json();

    const isExpiredToken =
      res.status === 401 ||
      (res.status === 403 &&
        /token/i.test(data?.message || data?.error?.message || ""));

    if (isExpiredToken) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        tokenRef.current = newToken;
        res = await fetch(url, buildOptions(newToken));
        data = await res.json();
      }
    }

    return { res, data };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const initialToken =
      localStorage.getItem("accessToken") || localStorage.getItem("token");

    if (!initialToken) {
      setErrorMsg("Please log in to list your wedding.");
      return;
    }

    // mutable holder so authFetch can update the token mid-flow after a refresh
    const tokenRef = { current: initialToken };

    setSubmitting(true);

    try {
      // Step 1 — couple, location, capacity & price
      const { res: step1Res, data: step1Data } = await authFetch(
        `${API_URL}/wedding/step-1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bride: { firstName: form.brideFirstName, lastName: form.brideLastName },
            groom: { firstName: form.groomFirstName, lastName: form.groomLastName },
            weddingEmail: form.weddingEmail,
            phone: form.phone,
            weddingStartDate: form.weddingStartDate,
            weddingEndDate: form.weddingEndDate || form.weddingStartDate,
            country: form.country,
            region: form.region,
            city: form.city,
            venueName: form.venueName,
            guestCapacity: Number(form.guestCapacity),
            pricePerPerson: form.pricePerPerson ? Number(form.pricePerPerson) : null,
            religion: form.religion,
          }),
        },
        tokenRef
      );
      if (!step1Res.ok) throw new Error(step1Data.message || step1Data.error?.message || "Couldn't save couple details.");
      const weddingId = step1Data.data._id;

      // Step 2 — photo & story
      const fd = new FormData();
      fd.append("weddingId", weddingId);
      fd.append("couplePhoto", photo);
      fd.append("storyDescription", form.storyDescription);
      const step2Res_data = await authFetch(
        `${API_URL}/wedding/step-2`,
        { method: "POST", body: fd },
        tokenRef
      );
      const { res: step2Res, data: step2Data } = step2Res_data;
      if (!step2Res.ok) throw new Error(step2Data.message || step2Data.error?.message || "Couldn't save your photo and story.");

      // Step 3 — events
      const events = EVENT_OPTIONS.filter((opt) => selectedEvents.includes(opt.key)).map(
        (opt, i) => ({
          day: 1,
          eventName: opt.eventName,
          ritualName: opt.ritualName,
          description: opt.description,
          startDate: form.weddingStartDate,
          startTime: "10:00",
          venueName: form.venueName,
          extraNotes: i === 0 ? form.extraNotes : "",
          location: {
            city: form.city,
            region: form.region,
            country: form.country,
            postalCode: "",
            street: "",
            houseNumber: "",
          },
        })
      );
      const { res: step3Res, data: step3Data } = await authFetch(
        `${API_URL}/wedding/step-3`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weddingId, totalWeddingDays: 1, events }),
        },
        tokenRef
      );
      if (!step3Res.ok) throw new Error(step3Data.message || step3Data.error?.message || "Couldn't save your events.");

      // Step 4 — ceremony guide (defaults to the host, kept off the form to stay one page)
      const { res: step4Res, data: step4Data } = await authFetch(
        `${API_URL}/wedding/step-4`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId,
            guideFirstName: form.brideFirstName,
            guideLastName: form.brideLastName,
            guideEmail: form.weddingEmail,
            guidePhoneNumber: form.phone,
            guideCoupleRelation: "Host",
            guideSpokenLanguages: ["English"],
          }),
        },
        tokenRef
      );
      if (!step4Res.ok) throw new Error(step4Data.message || step4Data.error?.message || "Couldn't save the ceremony guide.");

      // Step 5 — finalize listing (sets status to pending so it appears on /weddings)
      const { res: step5Res, data: step5Data } = await authFetch(
        `${API_URL}/wedding/step-5`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId,
            accountHolderName: "",
            ifcNumber: "",
            accountNumber: "",
            linkedBankModileNumber: "",
          }),
        },
        tokenRef
      );
      if (!step5Res.ok) throw new Error(step5Data.message || step5Data.error?.message || "Couldn't finish your listing.");

      navigate("/weddings");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF4EA] py-14 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-3">
          Reewaayat · Host a wedding
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          List your wedding
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Share your celebration with travelers eager to experience a real Indian wedding.
          Fill in the details below to start reviewing guest requests.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10 space-y-8"
      >
        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
            {errorMsg}
          </div>
        )}

        {/* About the couple */}
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">About the couple</h2>
          <p className="text-sm text-gray-400 mb-4">Introduce yourselves to potential guests.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bride's name</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="brideFirstName"
                  value={form.brideFirstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  name="brideLastName"
                  value={form.brideLastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Groom's name</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="groomFirstName"
                  value={form.groomFirstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  name="groomLastName"
                  value={form.groomLastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact email</label>
              <input
                type="email"
                name="weddingEmail"
                value={form.weddingEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Wedding tradition</label>
            <select
              name="religion"
              value={form.religion}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="">Select one</option>
              {RELIGION_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your story</label>
            <textarea
              name="storyDescription"
              value={form.storyDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us a little about how you met, your background, and what makes your wedding special..."
              className="border border-gray-200 rounded-lg p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </section>

        {/* Photo */}
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Couple photo</h2>
          <p className="text-sm text-gray-400 mb-4">This is the cover image guests will see first.</p>

          <label className="flex items-center gap-4 border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-orange-300 transition-colors">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center">
                <ImagePlus className="w-6 h-6 text-gray-300" />
              </div>
            )}
            <span className="text-sm text-gray-500">
              {photo ? photo.name : "Click to upload a JPG, PNG or WebP photo"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="hidden"
              onChange={(e) => handlePhoto(e.target.files?.[0])}
            />
          </label>
        </section>

        {/* Wedding details */}
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Wedding details</h2>
          <p className="text-sm text-gray-400 mb-4">Where and when is the celebration happening?</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur"
                  className="border border-gray-200 rounded-lg p-2.5 pl-9 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State / region</label>
              <input
                name="region"
                value={form.region}
                onChange={handleChange}
                placeholder="e.g. Rajasthan"
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. India"
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Venue name <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                name="venueName"
                value={form.venueName}
                onChange={handleChange}
                placeholder="e.g. The Leela Palace"
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start date</label>
              <input
                type="date"
                name="weddingStartDate"
                value={form.weddingStartDate}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End date</label>
              <input
                type="date"
                name="weddingEndDate"
                value={form.weddingEndDate}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Select events</h2>
          <p className="text-sm text-gray-400 mb-4">Which ceremonies are open for guests to attend?</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {EVENT_OPTIONS.map((opt) => {
              const checked = selectedEvents.includes(opt.key);
              return (
                <label
                  key={opt.key}
                  className={`flex items-start gap-3 border rounded-xl p-3.5 cursor-pointer transition-colors ${
                    checked ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleEvent(opt.key)}
                    className="mt-0.5 accent-orange-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{opt.eventName}</p>
                    <p className="text-xs text-gray-400">{opt.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* Hosting preferences */}
        <section>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Hosting preferences</h2>
          <p className="text-sm text-gray-400 mb-4">Set your availability and terms.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Guest capacity</label>
              <select
                name="guestCapacity"
                value={form.guestCapacity}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="2">Up to 2 guests</option>
                <option value="5">Up to 5 guests</option>
                <option value="10">Up to 10 guests</option>
                <option value="20">Up to 20 guests</option>
                <option value="50">Up to 50 guests</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price per guest (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  name="pricePerPerson"
                  value={form.pricePerPerson}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  className="border border-gray-200 rounded-lg p-2.5 pl-6 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Special instructions <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              name="extraNotes"
              value={form.extraNotes}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Guests must dress modestly, no photography during main ritual..."
              className="border border-gray-200 rounded-lg p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </section>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="submit"
            disabled={submitting}
            className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-7 py-3 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {submitting ? "Submitting..." : "Submit listing"}
          </button>
        </div>
      </form>
    </div>
  );
}