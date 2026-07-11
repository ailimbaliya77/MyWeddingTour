import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ImagePlus, Plus, Trash2, Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const emptyEvent = () => ({
  day: 1,
  eventName: "",
  description: "",
  ritualName: "",
  foodType: "",
  musicAvailable: false,
  dressCode: "",
  venueName: "",
  extraNotes: "",
  specialPerformance: "",
  startDate: "",
  startTime: "",
  location: {
    country: "",
    region: "",
    city: "",
    postalCode: "",
    street: "",
    houseNumber: "",
  },
});

const HostSingleListing = () => {
  const navigate = useNavigate();

  // ======================== FORM STATE (mirrors Step1-Step5 fields) ========================
  const [role, setRole] = useState("Bride");

  const [form, setForm] = useState({
    // Step 1
    bride: { firstName: "", lastName: "", email: "", phone: "" },
    groom: { firstName: "", lastName: "", email: "", phone: "" },

    // Step 2
    couplePhoto: null,
    storyDescription: "",
    youtube: "",

    // Step 3
    totalWeddingDays: 1,
    events: [emptyEvent()],

    // Step 4
    guideFirstName: "",
    guideLastName: "",
    guideEmail: "",
    guideEmailConfirm: "",
    guidePhoneNumber: "",
    guideCoupleRelation: "",
    guideSpokenLanguages: [""],

    // Step 5
    paymentMethod: "",
    paypalEmail: "",
    gpayNumber: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",
    otherPayment: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // ======================== HELPERS ========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    if (child) {
      setForm((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoUpload = (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type! Please upload JPG, PNG, WebP, or HEIC image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      alert("File size must be under 12MB.");
      return;
    }
    setForm((prev) => ({ ...prev, couplePhoto: file }));
    setPhotoPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, couplePhoto: "" }));
  };

  const handleDaysChange = (e) => {
    const nextDays = Math.max(1, Math.min(5, parseInt(e.target.value, 10) || 1));
    setForm((prev) => ({
      ...prev,
      totalWeddingDays: nextDays,
      events: prev.events.map((ev) => (ev.day > nextDays ? { ...ev, day: nextDays } : ev)),
    }));
  };

  const updateEvent = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.events];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, events: next };
    });
  };

  const updateEventLocation = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.events];
      next[index] = { ...next[index], location: { ...next[index].location, [key]: value } };
      return { ...prev, events: next };
    });
  };

  const addEvent = (day = 1) => {
    setForm((prev) => ({ ...prev, events: [...prev.events, { ...emptyEvent(), day }] }));
  };

  const removeEvent = (index) => {
    setForm((prev) => ({ ...prev, events: prev.events.filter((_, i) => i !== index) }));
  };

  const addLanguage = () => {
    setForm((prev) => ({ ...prev, guideSpokenLanguages: [...prev.guideSpokenLanguages, ""] }));
  };

  const updateLanguage = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.guideSpokenLanguages];
      updated[index] = value;
      return { ...prev, guideSpokenLanguages: updated };
    });
  };

  // ======================== VALIDATION (same rules as Step1/2/4) ========================
  const validate = () => {
    const newErrors = {};

    if (role === "Bride") {
      if (!form.bride.firstName?.trim()) newErrors["bride.firstName"] = "Bride's first name is required";
      if (!form.bride.lastName?.trim()) newErrors["bride.lastName"] = "Bride's last name is required";
      if (!form.bride.phone?.trim()) newErrors["bride.phone"] = "Bride's phone is required";
      if (!form.groom.firstName?.trim()) newErrors["groom.firstName"] = "Partner's first name is required";
      if (!form.groom.lastName?.trim()) newErrors["groom.lastName"] = "Partner's last name is required";
      if (!form.groom.email?.trim()) newErrors["groom.email"] = "Partner's email is required";
      if (!form.groom.phone?.trim()) newErrors["groom.phone"] = "Partner's phone is required";
    } else {
      if (!form.groom.firstName?.trim()) newErrors["groom.firstName"] = "Groom's first name is required";
      if (!form.groom.lastName?.trim()) newErrors["groom.lastName"] = "Groom's last name is required";
      if (!form.groom.phone?.trim()) newErrors["groom.phone"] = "Groom's phone is required";
      if (!form.bride.firstName?.trim()) newErrors["bride.firstName"] = "Partner's first name is required";
      if (!form.bride.lastName?.trim()) newErrors["bride.lastName"] = "Partner's last name is required";
      if (!form.bride.email?.trim()) newErrors["bride.email"] = "Partner's email is required";
      if (!form.bride.phone?.trim()) newErrors["bride.phone"] = "Partner's phone is required";
    }

    if (!form.couplePhoto) newErrors.couplePhoto = "Couple photo is required";
    if (!form.storyDescription || form.storyDescription.trim().length < 20)
      newErrors.storyDescription = "Story must be at least 20 characters";

    if (!form.guideFirstName) newErrors.guideFirstName = "First name is required";
    if (!form.guideLastName) newErrors.guideLastName = "Last name is required";
    if (!form.guideEmail) newErrors.guideEmail = "Email is required";
    if (form.guideEmail !== form.guideEmailConfirm) newErrors.guideEmailConfirm = "Emails do not match";
    if (!form.guidePhoneNumber) newErrors.guidePhoneNumber = "Phone is required";
    if (!form.guideCoupleRelation) newErrors.guideCoupleRelation = "Relation required";
    if (!form.guideSpokenLanguages.length || !form.guideSpokenLanguages[0])
      newErrors.guideSpokenLanguages = "At least 1 language required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================== TOKEN REFRESH + AUTH FETCH ========================
  const refreshAccessToken = async () => {
    try {
      let res = await fetch(`${API_URL}/auth/refresh`, {
        method: "GET",
        credentials: "include",
      });

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

  const authFetch = async (url, options, tokenRef) => {
    const buildOptions = (tok) => ({
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${tok}` },
    });

    let res = await fetch(url, buildOptions(tokenRef.current));
    let data = await res.json();

    const isExpiredToken =
      res.status === 401 ||
      (res.status === 403 && /token/i.test(data?.message || data?.error?.message || ""));

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

  // ======================== SUBMIT (calls step-1 .. step-5, same as before) ========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, _global: "" }));

    if (!validate()) {
      setErrors((prev) => ({ ...prev, _global: "Please fill all required fields correctly." }));
      return;
    }

    const initialToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!initialToken) {
      alert("Login required");
      navigate("/");
      return;
    }

    const tokenRef = { current: initialToken };
    const primaryPerson = role === "Bride" ? form.bride : form.groom;

    setSubmitting(true);

    try {
      // STEP 1 — couple info
      const { res: res1, data: data1 } = await authFetch(
        `${API_URL}/wedding/step-1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bride: { firstName: form.bride.firstName, lastName: form.bride.lastName },
            groom: { firstName: form.groom.firstName, lastName: form.groom.lastName },
            weddingEmail: primaryPerson.email,
            phone: primaryPerson.phone,
          }),
        },
        tokenRef
      );
      if (!res1.ok) throw new Error(data1.message || data1.error?.message || "Step 1 failed");
      const weddingId = data1.data._id;

      // STEP 2 — photo & story
      const fd = new FormData();
      fd.append("weddingId", weddingId);
      fd.append("couplePhoto", form.couplePhoto);
      fd.append("storyDescription", form.storyDescription);
      fd.append("youtube", form.youtube || "");

      const { res: res2, data: data2 } = await authFetch(
        `${API_URL}/wedding/step-2`,
        { method: "POST", body: fd },
        tokenRef
      );
      if (!res2.ok) throw new Error(data2.message || data2.error?.message || "Step 2 failed");

      // STEP 3 — events
      const { res: res3, data: data3 } = await authFetch(
        `${API_URL}/wedding/step-3`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId,
            totalWeddingDays: form.totalWeddingDays,
            events: form.events,
          }),
        },
        tokenRef
      );
      if (!res3.ok) throw new Error(data3.message || data3.error?.message || "Step 3 failed");

      // STEP 4 — ceremony guide
      const { res: res4, data: data4 } = await authFetch(
        `${API_URL}/wedding/step-4`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId,
            guideFirstName: form.guideFirstName,
            guideLastName: form.guideLastName,
            guideEmail: form.guideEmail,
            guidePhoneNumber: form.guidePhoneNumber,
            guideCoupleRelation: form.guideCoupleRelation,
            guideSpokenLanguages: form.guideSpokenLanguages.filter((l) => l.trim()),
          }),
        },
        tokenRef
      );
      if (!res4.ok) throw new Error(data4.message || data4.error?.message || "Step 4 failed");

      // STEP 5 — payment / finalize (sets status pending -> appears on /weddings)
      const { res: res5, data: data5 } = await authFetch(
        `${API_URL}/wedding/step-5`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId,
            accountHolderName: form.bankName || "",
            ifcNumber: form.ifsc || "",
            accountNumber: form.accountNumber || "",
            linkedBankModileNumber: form.gpayNumber || "",
          }),
        },
        tokenRef
      );
      if (!res5.ok) throw new Error(data5.message || data5.error?.message || "Step 5 failed");

      navigate("/weddings");
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, _global: err.message || "Something went wrong. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  // ======================== RENDER ========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">List Your Wedding</h1>
          <p className="text-gray-600">Fill in all the details below in one go — no steps, no back-and-forth.</p>
        </div>

        {errors._global && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors._global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl px-8 py-10 space-y-10">

          {/* ========== 1. ABOUT YOU ========== */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">1</span>
              About you
            </h2>
            <p className="text-sm text-gray-500 mb-6">Who's filling out this listing?</p>

            <select
              className="w-64 border px-4 py-2 rounded-lg mb-8 bg-teal-600 text-white font-medium cursor-pointer hover:bg-teal-700 transition"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Bride">Bride</option>
              <option value="Groom">Groom</option>
            </select>

            <h3 className="text-lg font-semibold mb-3">Your contact details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block mb-1 font-medium">
                  {role}'s First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "bride.firstName" : "groom.firstName"}
                  value={role === "Bride" ? form.bride.firstName : form.groom.firstName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "bride.firstName" : "groom.firstName"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter first name"
                />
                {errors[role === "Bride" ? "bride.firstName" : "groom.firstName"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "bride.firstName" : "groom.firstName"]}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  {role}'s Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "bride.lastName" : "groom.lastName"}
                  value={role === "Bride" ? form.bride.lastName : form.groom.lastName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "bride.lastName" : "groom.lastName"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors[role === "Bride" ? "bride.lastName" : "groom.lastName"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "bride.lastName" : "groom.lastName"]}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  {role}'s Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name={role === "Bride" ? "bride.email" : "groom.email"}
                  value={role === "Bride" ? form.bride.email : form.groom.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 border-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  {role}'s Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "bride.phone" : "groom.phone"}
                  value={role === "Bride" ? form.bride.phone : form.groom.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "bride.phone" : "groom.phone"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+91 1234567890"
                />
                {errors[role === "Bride" ? "bride.phone" : "groom.phone"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "bride.phone" : "groom.phone"]}</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Partner's details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">
                  Partner's First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "groom.firstName" : "bride.firstName"}
                  value={role === "Bride" ? form.groom.firstName : form.bride.firstName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "groom.firstName" : "bride.firstName"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter partner's first name"
                />
                {errors[role === "Bride" ? "groom.firstName" : "bride.firstName"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "groom.firstName" : "bride.firstName"]}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Partner's Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "groom.lastName" : "bride.lastName"}
                  value={role === "Bride" ? form.groom.lastName : form.bride.lastName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "groom.lastName" : "bride.lastName"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter partner's last name"
                />
                {errors[role === "Bride" ? "groom.lastName" : "bride.lastName"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "groom.lastName" : "bride.lastName"]}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Partner's Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name={role === "Bride" ? "groom.email" : "bride.email"}
                  value={role === "Bride" ? form.groom.email : form.bride.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "groom.email" : "bride.email"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="partner@example.com"
                />
                {errors[role === "Bride" ? "groom.email" : "bride.email"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "groom.email" : "bride.email"]}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Partner's Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={role === "Bride" ? "groom.phone" : "bride.phone"}
                  value={role === "Bride" ? form.groom.phone : form.bride.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition ${
                    errors[role === "Bride" ? "groom.phone" : "bride.phone"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+91 1234567890"
                />
                {errors[role === "Bride" ? "groom.phone" : "bride.phone"] && (
                  <p className="text-red-500 text-xs mt-1">{errors[role === "Bride" ? "groom.phone" : "bride.phone"]}</p>
                )}
              </div>
            </div>

            <div className="p-4 border bg-teal-50 rounded-xl text-gray-700 text-sm mt-8">
              🔒 We never share your private details. Only first names are visible publicly.
            </div>
          </section>

          {/* ========== 2. YOUR STORY ========== */}
          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">2</span>
              Your story
            </h2>
            <p className="text-sm text-gray-500 mb-6">Tell travelers about your wedding.</p>

            <div className="p-4 border bg-teal-50 rounded-xl text-gray-700 text-sm mb-4">
              📸 Please upload a photo of the to-be-married couple. Accepted formats: <b>JPG, PNG, WebP, HEIC</b>. Max size: <b>12MB</b>.
            </div>
            <div className="p-4 border bg-red-50 rounded-xl text-red-700 text-sm mb-6">
              ⚠️ Do not upload photos showing exact wedding location (map/invitation). Such images will be rejected by admin.
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-4 border border-dashed border-gray-300 rounded-lg p-5 cursor-pointer hover:bg-gray-50">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <span className="text-sm text-gray-600">
                  {form.couplePhoto ? form.couplePhoto.name : "Click to upload feature image"}
                </span>
                <input
                  type="file"
                  onChange={(e) => handlePhotoUpload(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {errors.couplePhoto && <p className="text-red-500 text-xs mt-1">{errors.couplePhoto}</p>}
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2">
                Your Love Story <span className="text-red-500">*</span>
              </label>
              <textarea
                name="storyDescription"
                value={form.storyDescription}
                onChange={handleChange}
                rows={5}
                className={`w-full border rounded-lg px-3 py-2 ${errors.storyDescription ? "border-red-500" : "border-gray-300"}`}
                placeholder="How did you meet? What makes your story special?"
              />
              {errors.storyDescription && <p className="text-red-500 text-xs mt-1">{errors.storyDescription}</p>}
            </div>

            <div>
              <label className="block font-medium mb-2">Engagement / Love Story Video (optional)</label>
              <input
                type="url"
                name="youtube"
                value={form.youtube}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Paste YouTube link"
              />
            </div>
          </section>

          {/* ========== 3. WEDDING EVENTS ========== */}
          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">3</span>
              Wedding events
            </h2>
            <p className="text-sm text-gray-500 mb-6">Share important details about your wedding days & ceremonies.</p>

            <div className="mb-6">
              <label className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-gray-700 text-md flex items-center gap-3 flex-wrap">
                How many days will your wedding go for?
                <select
                  value={form.totalWeddingDays}
                  onChange={handleDaysChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Day{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-gray-700 text-sm mb-8 flex items-start gap-3">
              <div className="text-teal-600 text-lg mt-1">ℹ️</div>
              <p>
                You are required to offer food and drinks (non alcoholic) at the wedding. Accommodation and
                transportation are not included in the price the travelers pay. You can offer these as extras
                after they've booked.
              </p>
            </div>

            {Array.from({ length: form.totalWeddingDays }).map((_, dayIdx) => {
              const dayNumber = dayIdx + 1;
              const dayEvents = form.events
                .map((ev, idx) => ({ ...ev, __realIndex: idx }))
                .filter((ev) => ev.day === dayNumber);

              return (
                <div key={dayNumber} className="mb-10 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-teal-700 mb-4">Day {dayNumber} — Wedding Functions</h3>

                  {dayEvents.map((ev) => {
                    const realIndex = ev.__realIndex;
                    return (
                      <div key={realIndex} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <h4 className="text-lg font-semibold text-pink-700">Event (Day {dayNumber})</h4>
                          {form.events.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEvent(realIndex)}
                              className="px-3 py-1 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          placeholder="Name of the event (e.g., Sangeet, Haldi)"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.eventName}
                          onChange={(e) => updateEvent(realIndex, "eventName", e.target.value)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 text-sm mb-1">When does it start? *</label>
                            <input
                              type="date"
                              className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm"
                              value={ev.startDate || ""}
                              onChange={(e) => updateEvent(realIndex, "startDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm mb-1">What time does it start? *</label>
                            <input
                              type="time"
                              className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm"
                              value={ev.startTime || ""}
                              onChange={(e) => updateEvent(realIndex, "startTime", e.target.value)}
                            />
                          </div>
                        </div>

                        <textarea
                          rows={3}
                          placeholder="Tell travelers what will happen at this event..."
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.description}
                          onChange={(e) => updateEvent(realIndex, "description", e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Food Type (Veg / Non-Veg / Both)"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.foodType}
                          onChange={(e) => updateEvent(realIndex, "foodType", e.target.value)}
                        />

                        <label className="flex items-center gap-2 mb-4">
                          <input
                            type="checkbox"
                            checked={!!ev.musicAvailable}
                            onChange={(e) => updateEvent(realIndex, "musicAvailable", e.target.checked)}
                          />
                          <span className="text-gray-700">Will there be music or dance?</span>
                        </label>

                        <input
                          type="text"
                          placeholder="Dress code (optional)"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.dressCode}
                          onChange={(e) => updateEvent(realIndex, "dressCode", e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Venue Name"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.venueName}
                          onChange={(e) => updateEvent(realIndex, "venueName", e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Ritual name (optional)"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.ritualName}
                          onChange={(e) => updateEvent(realIndex, "ritualName", e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Special performance (optional)"
                          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                          value={ev.specialPerformance}
                          onChange={(e) => updateEvent(realIndex, "specialPerformance", e.target.value)}
                        />

                        <h5 className="font-semibold text-gray-700 mb-2 mt-4">Event Location</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Country"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.country}
                            onChange={(e) => updateEventLocation(realIndex, "country", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="City"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.city}
                            onChange={(e) => updateEventLocation(realIndex, "city", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Region"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.region}
                            onChange={(e) => updateEventLocation(realIndex, "region", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Postal Code"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.postalCode}
                            onChange={(e) => updateEventLocation(realIndex, "postalCode", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Street"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.street}
                            onChange={(e) => updateEventLocation(realIndex, "street", e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="House Number"
                            className="border px-3 py-2 rounded-lg shadow-sm"
                            value={ev.location.houseNumber}
                            onChange={(e) => updateEventLocation(realIndex, "houseNumber", e.target.value)}
                          />
                        </div>

                        <textarea
                          rows={3}
                          placeholder="Any important notes for guests?"
                          className="w-full px-3 py-2 border rounded-lg mt-4 shadow-sm"
                          value={ev.extraNotes}
                          onChange={(e) => updateEvent(realIndex, "extraNotes", e.target.value)}
                        />
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
                    onClick={() => addEvent(dayNumber)}
                  >
                    <Plus className="w-4 h-4" /> Add another function
                  </button>
                </div>
              );
            })}
          </section>

          {/* ========== 4. CEREMONY GUIDE ========== */}
          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">4</span>
              Ceremony guide
            </h2>
            <p className="text-sm text-gray-500 mb-6">Nominate someone guests can contact before the wedding.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-1">Guide First Name *</label>
                <input
                  type="text"
                  name="guideFirstName"
                  value={form.guideFirstName}
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
                  value={form.guideLastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.guideLastName && <p className="text-red-600 text-xs">{errors.guideLastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-1">Guide Email *</label>
                <input
                  type="email"
                  name="guideEmail"
                  value={form.guideEmail}
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
                  value={form.guideEmailConfirm}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.guideEmailConfirm && <p className="text-red-600 text-xs">{errors.guideEmailConfirm}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-1">Guide Phone Number *</label>
              <input
                type="tel"
                name="guidePhoneNumber"
                value={form.guidePhoneNumber}
                onChange={handleChange}
                placeholder="+911234567890"
                className="w-full border rounded px-3 py-2"
              />
              {errors.guidePhoneNumber && <p className="text-red-600 text-xs">{errors.guidePhoneNumber}</p>}
            </div>

            <div className="mb-6">
              <label className="block mb-1">Guide-Couple Relationship *</label>
              <input
                type="text"
                name="guideCoupleRelation"
                value={form.guideCoupleRelation}
                onChange={handleChange}
                placeholder="e.g. Brother, Aunt"
                className="w-full border rounded px-3 py-2"
              />
              {errors.guideCoupleRelation && <p className="text-red-600 text-xs">{errors.guideCoupleRelation}</p>}
            </div>

            <div>
              <label className="block mb-2">Guide Spoken Languages *</label>
              {form.guideSpokenLanguages.map((lang, index) => (
                <input
                  key={index}
                  type="text"
                  value={lang}
                  onChange={(e) => updateLanguage(index, e.target.value)}
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
              {errors.guideSpokenLanguages && <p className="text-red-600 text-xs mt-1">{errors.guideSpokenLanguages}</p>}
            </div>
          </section>

          {/* ========== 5. RECEIVE CONTRIBUTIONS ========== */}
          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">5</span>
              Receive traveler contributions
            </h2>

            <div className="mb-6 mt-4 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
              <p>
                💰 From each traveler attending your wedding you will receive <b>60% of traveler contribution</b>{" "}
                (minimum of USD 60) as a wedding gift through MyWeddingTour.
              </p>
              <p className="mt-2 font-semibold">Traveler contributions include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access to wedding on the chosen day</li>
                <li>Connection with Ceremony Guide before the wedding</li>
                <li>Access to meals on the chosen day</li>
              </ul>
              <p className="mt-2 font-semibold">Traveler contributions should NOT include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Transportation to the wedding venue</li>
                <li>Accommodation at the wedding</li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you like to receive your wedding contribution?
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select a method</option>
                <option value="PayPal">PayPal</option>
                <option value="GooglePay">Google Pay (GPay)</option>
                <option value="BankTransfer">Bank Transfer</option>
                <option value="UPI">UPI ID</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {form.paymentMethod === "PayPal" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PayPal Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={form.paypalEmail}
                  onChange={handleChange}
                  placeholder="Your PayPal email"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            {form.paymentMethod === "GooglePay" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Pay (GPay) Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="gpayNumber"
                  value={form.gpayNumber}
                  onChange={handleChange}
                  placeholder="Enter your GPay linked number"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            {form.paymentMethod === "BankTransfer" && (
              <div className="mb-6 space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Bank Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9101"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <label className="block text-sm font-medium text-gray-700">
                  IFSC / SWIFT Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifsc"
                  value={form.ifsc}
                  onChange={handleChange}
                  placeholder="IFSC or SWIFT code"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            {form.paymentMethod === "UPI" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={form.upiId}
                  onChange={handleChange}
                  placeholder="example@upi"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            {form.paymentMethod === "Other" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Specify Payment Method</label>
                <input
                  type="text"
                  name="otherPayment"
                  value={form.otherPayment}
                  onChange={handleChange}
                  placeholder="Enter your payment details"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            )}

            <div className="p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
              <p className="font-semibold mb-2">⏳ When will I receive the traveler contributions?</p>
              <p>
                Money collected from bookings will be deposited into MyWeddingTour's account and transferred to
                you after the last day of your wedding is over.
              </p>
            </div>
          </section>

          {/* SUBMIT */}
          <div className="flex justify-end gap-4 pt-8 border-t">
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 disabled:opacity-60 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostSingleListing;