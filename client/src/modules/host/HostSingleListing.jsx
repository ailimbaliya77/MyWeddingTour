import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Check,
  Heart,
  CalendarDays,
  Sparkles,
  Users,
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  Info,
  ImagePlus,
  X,
  Languages,
  Music,
  Shirt,
  Utensils,
  Wallet,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EVENT_OPTIONS = [
  { key: "mainWedding", label: "Main Wedding (Pheras)", desc: "The traditional marriage ceremony.", emoji: "💍" },
  { key: "sangeet", label: "Sangeet Night", desc: "Musical night with dance & performances.", emoji: "🎶" },
  { key: "haldi", label: "Haldi Ceremony", desc: "Turmeric application ritual.", emoji: "🌼" },
  { key: "mehndi", label: "Mehndi", desc: "Henna application for bride & guests.", emoji: "🖐️" },
];

const STEPS = [
  { key: "couple", label: "The Couple", icon: Heart },
  { key: "details", label: "Details", icon: CalendarDays },
  { key: "events", label: "Events", icon: Sparkles },
  { key: "practical", label: "Good to Know", icon: Info },
  { key: "preferences", label: "Preferences", icon: Users },
  { key: "review", label: "Review", icon: ClipboardCheck },
];

const inputClass =
  "w-full border border-[#EADFD3] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C9922E]/30 focus:border-[#C9922E] transition";
const labelClass = "block text-sm font-semibold text-[#2A1B1E] mb-1.5";
const errorClass = "text-[#A23E4C] text-xs mt-1";

const HostSingleListing = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    story: "",
    hostWelcomeMessage: "",
    location: "",
    venueName: "",
    startDate: "",
    endDate: "",
    events: ["mainWedding"],
    guideName: "",
    guideRelation: "",
    guideEmail: "",
    guidePhone: "",
    guideLanguages: "",
    includeGiftDetails: false,
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    guestCapacity: "1-2 Guests",
    pricePerGuest: "",
    specialInstructions: "",
  });

  // Per-ceremony details, keyed by event key — this is what makes each
  // ceremony card show its own dress code / food / music instead of one
  // global value copied onto every event.
  const [eventDetails, setEventDetails] = useState({
    mainWedding: { dressCode: "", foodType: "", musicAvailable: true, note: "" },
  });

  // Photo uploads kept separate from `form` since they're File objects, not plain values.
  const [photos, setPhotos] = useState({
    bride: null, // { file, preview }
    groom: null,
    invitation: null,
    events: {}, // { [eventKey]: { file, preview } }
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleEvent = (key) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(key) ? prev.events.filter((k) => k !== key) : [...prev.events, key],
    }));
    setEventDetails((prev) => {
      if (prev[key]) return prev; // already has details, keep them even if unchecked then rechecked
      return { ...prev, [key]: { dressCode: "", foodType: "", musicAvailable: true, note: "" } };
    });
  };

  const updateEventDetail = (key, field, value) => {
    setEventDetails((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleEventPhotoSelect = (key, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPhotos((prev) => ({ ...prev, events: { ...prev.events, [key]: { file, preview } } }));
  };

  const removeEventPhoto = (key) => {
    setPhotos((prev) => {
      if (prev.events[key]?.preview) URL.revokeObjectURL(prev.events[key].preview);
      const nextEvents = { ...prev.events };
      delete nextEvents[key];
      return { ...prev, events: nextEvents };
    });
  };

  const handlePhotoSelect = (key, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPhotos((prev) => ({ ...prev, [key]: { file, preview } }));
  };

  const removePhoto = (key) => {
    setPhotos((prev) => {
      if (prev[key]?.preview) URL.revokeObjectURL(prev[key].preview);
      return { ...prev, [key]: null };
    });
  };

  const validateStep = (index) => {
    const newErrors = {};
    if (index === 0) {
      if (!form.brideName.trim()) newErrors.brideName = "Bride's name is required";
      if (!form.groomName.trim()) newErrors.groomName = "Groom's name is required";
      if (!form.story.trim() || form.story.trim().length < 20)
        newErrors.story = "Tell guests a bit more — at least 20 characters";
    }
    if (index === 1) {
      if (!form.location.trim()) newErrors.location = "Wedding location is required";
      if (!form.startDate) newErrors.startDate = "Start date is required";
      if (!form.endDate) newErrors.endDate = "End date is required";
    }
    if (index === 2) {
      if (!form.events.length) newErrors.events = "Select at least one event";
    }
    if (index === 4) {
      if (!form.pricePerGuest) newErrors.pricePerGuest = "Price per guest is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(stepIndex)) return;
    setDirection("forward");
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection("back");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const goToStep = (i) => {
    if (i < stepIndex) {
      setDirection("back");
      setStepIndex(i);
    }
  };

  const submitListing = async (isDraft) => {
    if (!isDraft) {
      for (let i = 0; i < STEPS.length - 1; i++) {
        if (!validateStep(i)) {
          setStepIndex(i);
          return;
        }
      }
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

      // Build a rich event payload: each selected ceremony carries its own
      // label, dress code, food type, music flag and note — not one global set.
      const eventsPayload = form.events.map((key) => {
        const opt = EVENT_OPTIONS.find((o) => o.key === key);
        const details = eventDetails[key] || {};
        return {
          key,
          label: opt?.label || key,
          dressCode: details.dressCode || "",
          foodType: details.foodType || "",
          musicAvailable: details.musicAvailable ?? true,
          note: details.note || "",
        };
      });

      // FormData so bride/groom/event photos and the invitation card upload alongside the form fields.
      const payload = new FormData();
      const { events, ...restForm } = form;
      Object.entries({ ...restForm, status: isDraft ? "draft" : "pending" }).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("events", JSON.stringify(eventsPayload));

      if (photos.bride?.file) payload.append("bridePhoto", photos.bride.file);
      if (photos.groom?.file) payload.append("groomPhoto", photos.groom.file);
      if (photos.invitation?.file) payload.append("invitationCard", photos.invitation.file);
      Object.entries(photos.events).forEach(([key, photo]) => {
        if (photo?.file) payload.append(`eventPhoto_${key}`, photo.file);
      });

      const res = await fetch(`${API_URL}/wedding/create-single`, {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
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

  const coupleNames =
    form.brideName || form.groomName ? `${form.brideName || "Your"} & ${form.groomName || "Partner's"}` : null;

  const dateRange =
    form.startDate && form.endDate
      ? `${new Date(form.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${new Date(
          form.endDate
        ).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
      : null;

  const selectedEventLabels = EVENT_OPTIONS.filter((o) => form.events.includes(o.key));

  return (
    <div className="min-h-screen bg-[#FBF6EF] rw-sans text-[#2A1B1E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        .rw-serif { font-family: 'Fraunces', serif; }
        .rw-sans { font-family: 'Inter', sans-serif; }
        @keyframes step-in-forward { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes step-in-back { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        .step-enter-forward { animation: step-in-forward 400ms ease-out; }
        .step-enter-back { animation: step-in-back 400ms ease-out; }
        @keyframes rw-expand-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .rw-expand { animation: rw-expand-in 260ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .step-enter-forward, .step-enter-back, .rw-expand { animation: none; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#EADFD3] bg-[#FBF6EF]/95 px-6 py-4 backdrop-blur-md">
        <Link to="/" className="rw-serif text-2xl font-semibold">
          <span className="text-[#5C1A28]">Ree</span>
          <span className="text-[#2A1B1E]">waayat</span>
        </Link>
        <Link to="/host/dashboard" className="text-sm font-semibold text-[#5C1A28] hover:text-[#3C0F1A]">
          Save &amp; exit
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
        {/* MAIN COLUMN */}
        <div>
          <div className="mb-8 text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9922E]">Become A Host Family</p>
            <h1 className="mt-2 rw-serif text-3xl font-semibold text-[#2A1B1E] sm:text-4xl">
              Let's Build Your Wedding Listing
            </h1>
            <p className="mt-2 text-[#6B5750]">
              Six short steps. Save as a draft anytime — nothing goes public until you submit it for review.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-10 flex items-center justify-between">
            {STEPS.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === stepIndex;
              const isDone = i < stepIndex;
              return (
                <React.Fragment key={step.key}>
                  <button type="button" onClick={() => goToStep(i)} className="flex flex-col items-center gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                        isDone
                          ? "border-[#C9922E] bg-[#C9922E] text-white"
                          : isActive
                          ? "border-[#5C1A28] bg-white text-[#5C1A28] shadow-[0_0_0_4px_rgba(92,26,40,0.1)]"
                          : "border-[#EADFD3] bg-white text-[#D9C4B8]"
                      }`}
                    >
                      {isDone ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                    </span>
                    <span className={`hidden text-[11px] font-semibold sm:block ${isActive ? "text-[#2A1B1E]" : "text-[#A69488]"}`}>
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="mx-1 h-[2px] flex-1 bg-[#EADFD3]">
                      <div className="h-full bg-[#C9922E] transition-all duration-500" style={{ width: isDone ? "100%" : "0%" }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Step content card */}
          <div
            key={stepIndex}
            className={`rounded-2xl border border-[#EADFD3] bg-white p-8 shadow-sm ${
              direction === "forward" ? "step-enter-forward" : "step-enter-back"
            }`}
          >
            {stepIndex === 0 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Tell Us About The Couple</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">
                  This is what guests will see first — make it feel like an invitation, not a form.
                </p>

                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Bride's Name</label>
                    <input type="text" name="brideName" value={form.brideName} onChange={handleChange} placeholder="e.g. Priya" className={inputClass} />
                    {errors.brideName && <p className={errorClass}>{errors.brideName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Groom's Name</label>
                    <input type="text" name="groomName" value={form.groomName} onChange={handleChange} placeholder="e.g. Rahul" className={inputClass} />
                    {errors.groomName && <p className={errorClass}>{errors.groomName}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Your Story</label>
                  <textarea
                    name="story"
                    value={form.story}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How did you meet? What makes your celebration special? Guests want to feel invited into your story, not just your schedule."
                    className={`${inputClass} resize-none`}
                  />
                  {errors.story && <p className={errorClass}>{errors.story}</p>}
                  <p className="mt-2 text-xs text-[#A69488]">
                    Only your first names are shown publicly. Full contact details stay private until you accept a guest.
                  </p>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Welcome message from the family (Optional)</label>
                  <input
                    type="text"
                    name="hostWelcomeMessage"
                    value={form.hostWelcomeMessage}
                    onChange={handleChange}
                    placeholder="e.g. We're excited to welcome global guests to experience our traditions."
                    className={inputClass}
                  />
                  <p className="mt-2 text-xs text-[#A69488]">Shown on your listing as "Hosted by {form.brideName || "..."} & family".</p>
                </div>

                {/* Photos */}
                <div>
                  <label className={labelClass}>Photos</label>
                  <p className="mb-3 text-xs text-[#A69488]">
                    Add photos of the couple and your wedding invitation card — listings with real photos get booked faster.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <PhotoUpload label="Bride's photo" photo={photos.bride} onSelect={(f) => handlePhotoSelect("bride", f)} onRemove={() => removePhoto("bride")} round />
                    <PhotoUpload label="Groom's photo" photo={photos.groom} onSelect={(f) => handlePhotoSelect("groom", f)} onRemove={() => removePhoto("groom")} round />
                    <PhotoUpload label="Wedding invitation card" photo={photos.invitation} onSelect={(f) => handlePhotoSelect("invitation", f)} onRemove={() => removePhoto("invitation")} />
                  </div>
                </div>
              </div>
            )}

            {stepIndex === 1 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Where &amp; When</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">Give guests enough to start imagining the trip.</p>

                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Wedding Location (City)</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D9C4B8]" />
                      <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Jaipur, Rajasthan" className={`${inputClass} pl-9`} />
                    </div>
                    {errors.location && <p className={errorClass}>{errors.location}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Venue Name (Optional)</label>
                    <input type="text" name="venueName" value={form.venueName} onChange={handleChange} placeholder="e.g. The Leela Palace" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputClass} />
                    {errors.startDate && <p className={errorClass}>{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputClass} />
                    {errors.endDate && <p className={errorClass}>{errors.endDate}</p>}
                  </div>
                </div>
              </div>
            )}

            {stepIndex === 2 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Which Moments Can Guests Join?</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">
                  Choose the ceremonies you're comfortable opening up, then tell guests what to expect at each one —
                  every ceremony can have its own dress code, food, music and photo.
                </p>

                <div className="space-y-3">
                  {EVENT_OPTIONS.map((opt) => {
                    const checked = form.events.includes(opt.key);
                    const details = eventDetails[opt.key] || { dressCode: "", foodType: "", musicAvailable: true, note: "" };
                    const eventPhoto = photos.events[opt.key];
                    return (
                      <div key={opt.key} className={`rounded-xl border transition ${checked ? "border-[#C9922E] bg-[#FBF0DB]/30" : "border-[#EADFD3]"}`}>
                        <label className="flex cursor-pointer items-start gap-3 p-4">
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              toggleEvent(opt.key);
                            }}
                            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition ${
                              checked ? "border-[#C9922E] bg-[#C9922E]" : "border-[#EADFD3] bg-white"
                            }`}
                          >
                            {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-[#2A1B1E]">
                              {opt.emoji} {opt.label}
                            </div>
                            <div className="mt-0.5 text-xs text-[#6B5750]">{opt.desc}</div>
                          </div>
                        </label>

                        {checked && (
                          <div className="border-t border-[#EADFD3]/70 p-4 pt-4 space-y-4 rw-expand">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div>
                                <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#2A1B1E]">
                                  <Shirt className="h-3 w-3 text-[#C9922E]" /> Dress code for this ceremony
                                </label>
                                <input
                                  type="text"
                                  value={details.dressCode}
                                  onChange={(e) => updateEventDetail(opt.key, "dressCode", e.target.value)}
                                  placeholder="e.g. Yellow or bright colours"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#2A1B1E]">
                                  <Utensils className="h-3 w-3 text-[#C9922E]" /> Food at this ceremony
                                </label>
                                <input
                                  type="text"
                                  value={details.foodType}
                                  onChange={(e) => updateEventDetail(opt.key, "foodType", e.target.value)}
                                  placeholder="e.g. Light snacks & chaat"
                                  className={inputClass}
                                />
                              </div>
                            </div>

                            <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-[#2A1B1E]">
                              <span
                                onClick={() => updateEventDetail(opt.key, "musicAvailable", !details.musicAvailable)}
                                className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                                  details.musicAvailable ? "border-[#C9922E] bg-[#C9922E]" : "border-[#EADFD3] bg-white"
                                }`}
                              >
                                {details.musicAvailable && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                              </span>
                              <Music className="h-3.5 w-3.5 text-[#C9922E]" /> Live music at this ceremony
                            </label>

                            <div>
                              <label className="mb-1 block text-xs font-semibold text-[#2A1B1E]">
                                What happens here? <span className="font-normal text-[#A69488]">(optional)</span>
                              </label>
                              <textarea
                                value={details.note}
                                onChange={(e) => updateEventDetail(opt.key, "note", e.target.value)}
                                rows={2}
                                placeholder={`A line or two describing the ${opt.label.toLowerCase()} for guests...`}
                                className={`${inputClass} resize-none`}
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-xs font-semibold text-[#2A1B1E]">Photo of this ceremony</label>
                              <div className="w-40">
                                <PhotoUpload
                                  label={`${opt.label} photo`}
                                  photo={eventPhoto}
                                  onSelect={(f) => handleEventPhotoSelect(opt.key, f)}
                                  onRemove={() => removeEventPhoto(opt.key)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.events && <p className={`${errorClass} mt-2`}>{errors.events}</p>}
              </div>
            )}

            {stepIndex === 3 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Good to Know for Guests</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">
                  A few details that apply across your whole wedding, not tied to any single ceremony.
                </p>

                <div className="mb-6 rounded-xl border border-[#EADFD3] p-5">
                  <p className="mb-4 text-sm font-semibold text-[#2A1B1E]">Ceremony guide (optional)</p>
                  <p className="mb-4 -mt-2 text-xs text-[#6B5750]">
                    A family member or friend guests can contact — shown as their point of contact on the day.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input type="text" name="guideName" value={form.guideName} onChange={handleChange} placeholder="Guide's name" className={inputClass} />
                    <input type="text" name="guideRelation" value={form.guideRelation} onChange={handleChange} placeholder="Relation, e.g. Bride's cousin" className={inputClass} />
                    <input type="email" name="guideEmail" value={form.guideEmail} onChange={handleChange} placeholder="Email" className={inputClass} />
                    <input type="tel" name="guidePhone" value={form.guidePhone} onChange={handleChange} placeholder="Phone number" className={inputClass} />
                    <div className="relative md:col-span-2">
                      <Languages className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D9C4B8]" />
                      <input
                        type="text"
                        name="guideLanguages"
                        value={form.guideLanguages}
                        onChange={handleChange}
                        placeholder="Spoken languages, e.g. English, Hindi"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#EADFD3] p-5">
                  <label className="flex cursor-pointer items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#2A1B1E]">
                      <Wallet className="h-4 w-4 text-[#C9922E]" /> Accept monetary gifts
                    </span>
                    <span
                      onClick={() => setForm((prev) => ({ ...prev, includeGiftDetails: !prev.includeGiftDetails }))}
                      className={`relative h-6 w-11 rounded-full transition ${form.includeGiftDetails ? "bg-[#C9922E]" : "bg-[#EADFD3]"}`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                          form.includeGiftDetails ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </label>
                  {form.includeGiftDetails && (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <input type="text" name="accountHolderName" value={form.accountHolderName} onChange={handleChange} placeholder="Account holder name" className={inputClass} />
                      <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} placeholder="Account number" className={inputClass} />
                      <input type="text" name="ifscCode" value={form.ifscCode} onChange={handleChange} placeholder="IFSC code" className={`${inputClass} md:col-span-2`} />
                    </div>
                  )}
                  <p className="mt-3 text-xs text-[#A69488]">Optional — shown to guests as a gesture, never a requirement.</p>
                </div>
              </div>
            )}

            {stepIndex === 4 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Hosting Preferences</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">Set your comfort level for how many guests, and what it costs to join.</p>

                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Guest Capacity</label>
                    <select name="guestCapacity" value={form.guestCapacity} onChange={handleChange} className={inputClass}>
                      <option>1-2 Guests</option>
                      <option>3-5 Guests</option>
                      <option>6-10 Guests</option>
                      <option>10+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Price per Guest (₹)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#D9C4B8]">₹</span>
                      <input type="number" name="pricePerGuest" value={form.pricePerGuest} onChange={handleChange} placeholder="e.g. 12000" className={`${inputClass} pl-7`} />
                    </div>
                    {errors.pricePerGuest && <p className={errorClass}>{errors.pricePerGuest}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Special Instructions (Optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={form.specialInstructions}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Guests should dress modestly, no photography during the main ritual..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            )}

            {stepIndex === 5 && (
              <div>
                <h2 className="rw-serif text-2xl font-semibold text-[#2A1B1E]">Review &amp; Submit</h2>
                <p className="mt-1 mb-6 text-sm text-[#6B5750]">Take one more look — this is exactly what our review team will see.</p>

                <div className="space-y-4 text-sm mb-6">
                  {[
                    ["Couple", coupleNames || "—"],
                    ["Location", form.location || "—"],
                    ["Dates", dateRange || "—"],
                    ["Ceremony guide", form.guideName || "—"],
                    ["Photos added", `${[photos.bride, photos.groom, photos.invitation, ...Object.values(photos.events)].filter(Boolean).length}`],
                    ["Price per Guest", form.pricePerGuest ? `₹${form.pricePerGuest}` : "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-dashed border-[#EADFD3] pb-3">
                      <span className="text-[#A69488]">{label}</span>
                      <span className="font-semibold text-[#2A1B1E] text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {selectedEventLabels.length > 0 && (
                  <div className="mb-2">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#A69488]">Ceremonies &amp; their details</p>
                    <div className="space-y-3">
                      {selectedEventLabels.map((opt) => {
                        const d = eventDetails[opt.key] || {};
                        return (
                          <div key={opt.key} className="rounded-xl border border-[#EADFD3] p-4 text-sm">
                            <p className="font-semibold text-[#2A1B1E] mb-1">{opt.emoji} {opt.label}</p>
                            <p className="text-xs text-[#6B5750]">
                              {d.dressCode || "No dress code set"} · {d.foodType || "No food type set"} ·{" "}
                              {d.musicAvailable ? "Live music" : "No live music"}
                              {photos.events[opt.key] ? " · Photo added" : ""}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className="mt-6 rounded-lg bg-[#FBF6EF] p-4 text-xs text-[#A69488]">
                  Submitting sends your listing for review — it won't be visible to guests until approved. You'll hear back within 2–3 business days.
                </p>
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-[#F1E6DC] pt-6">
              <button type="button" onClick={() => submitListing(true)} disabled={submitting} className="text-sm font-semibold text-[#5C1A28] hover:text-[#3C0F1A]">
                Save as Draft
              </button>

              <div className="flex items-center gap-3">
                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-1.5 rounded-full border border-[#EADFD3] px-5 py-2.5 text-sm font-semibold text-[#2A1B1E] transition hover:border-[#C9922E]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}

                {stepIndex < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5C1A28] to-[#3C0F1A] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => submitListing(false)}
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5C1A28] to-[#3C0F1A] px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting...
                      </>
                    ) : (
                      "Submit For Review"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#A69488]">Live Preview</p>
            <div className="overflow-hidden rounded-2xl border border-[#EADFD3] bg-white shadow-sm">
              <div
                className="relative h-36 bg-cover bg-center"
                style={
                  photos.invitation
                    ? { backgroundImage: `url(${photos.invitation.preview})` }
                    : { background: "linear-gradient(135deg, #5C1A28 0%, #3C0F1A 100%)" }
                }
              >
                {photos.invitation && <div className="absolute inset-0 bg-black/35" />}
                {selectedEventLabels[0] && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#5C1A28]">
                    {selectedEventLabels[0].emoji} {selectedEventLabels[0].label}
                  </span>
                )}
                <div className="absolute inset-x-3 bottom-3 flex items-end gap-2 text-white">
                  {(photos.bride || photos.groom) && (
                    <div className="flex -space-x-2">
                      {[photos.bride, photos.groom].filter(Boolean).map((p, i) => (
                        <img key={i} src={p.preview} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                  )}
                  <div>
                    <p className="rw-serif text-lg font-semibold leading-tight">{coupleNames || "Your Names Here"}</p>
                    {form.location && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
                        <MapPin className="h-3 w-3" />
                        {form.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {dateRange && <p className="text-xs font-semibold text-[#5C1A28]">{dateRange}</p>}
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#6B5750]">
                  {form.story || "Your story will appear here as you write it."}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedEventLabels.map((e) => (
                    <span key={e.key} className="rounded-full bg-[#FBF6EF] px-2 py-1 text-[10px] font-medium text-[#A69488]">
                      {e.emoji} {e.label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#F1E6DC] pt-3">
                  <span className="text-[11px] text-[#A69488]">{form.guestCapacity}</span>
                  <span className="rw-serif text-lg font-semibold text-[#2A1B1E]">
                    {form.pricePerGuest ? `₹${Number(form.pricePerGuest).toLocaleString("en-IN")}` : "₹—"}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-[#A69488]">This is exactly how guests will see your listing.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Small reusable upload tile with preview + remove, used for bride/groom photos and the invitation card.
function PhotoUpload({ label, photo, onSelect, onRemove, round = false }) {
  const inputId = `upload-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onSelect(e.target.files?.[0])}
      />
      {photo ? (
        <div className="relative">
          <img
            src={photo.preview}
            alt={label}
            className={`h-28 w-full object-cover border-2 border-[#F3E1D8] ${round ? "rounded-full aspect-square w-28 mx-auto" : "rounded-xl"}`}
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#EADFD3] text-[#A23E4C] shadow-sm"
            aria-label={`Remove ${label}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 border-2 border-dashed border-[#EADFD3] text-[#A69488] hover:border-[#C9922E] hover:text-[#C9922E] transition ${
            round ? "rounded-full aspect-square w-28 mx-auto" : "rounded-xl"
          }`}
        >
          <ImagePlus className="h-5 w-5" />
        </label>
      )}
      <p className="mt-2 text-center text-xs text-[#6B5750]">{label}</p>
    </div>
  );
}

export default HostSingleListing;