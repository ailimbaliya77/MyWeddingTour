import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar, MapPin, Users, Heart, CheckCircle,
  Shield, ArrowLeft, ArrowRight, User, Mail, Phone,
  Globe, Info, Shirt, Star, AlertCircle, Lock,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function fmt(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric",
  });
}

/* ── Step bar ── */
function StepBar({ current, steps }) {
  return (
    <div className="flex items-center mb-10">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
              i < current  ? "bg-orange-500 border-orange-500 text-white"
              : i === current ? "bg-white border-orange-500 text-orange-500"
              : "bg-white border-gray-200 text-gray-400"
            }`}>
              {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] font-semibold mt-1.5 whitespace-nowrap tracking-wide ${
              i === current ? "text-orange-500" : i < current ? "text-gray-500" : "text-gray-300"
            }`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 mb-5 transition-colors duration-300 ${
              i < current ? "bg-orange-500" : "bg-gray-200"
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Field wrapper ── */
function Field({ label, required, hint, error, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-medium">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  );
}

/* ── Section heading inside form ── */
function FormSection({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 pb-4 mb-2 border-b border-gray-100">
      <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-orange-500" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

const inputCls = `w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm
  text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-400
  focus:ring-2 focus:ring-orange-100 transition-all duration-200`;

const selectCls = `w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm
  text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
  transition-all duration-200 appearance-none cursor-pointer`;

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function BookingPage() {
  const { weddingId } = useParams();
  const navigate      = useNavigate();

  const [wedding,      setWedding]      = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [step,         setStep]         = useState(0);
  const [submitting,   setSubmitting]   = useState(false);
  const [serverError,  setServerError]  = useState("");
  const [errors,       setErrors]       = useState({});

  const [form, setForm] = useState({
    guestName: "", guestEmail: "", confirmEmail: "", guestPhone: "",
    nationality: "", countryOfResidence: "", passportNumber: "",
    dateOfBirth: "", gender: "",
    seats: 1, arrivalDate: "", departureDate: "",
    accommodationNeeded: "no", dietaryPreference: "no_preference",
    allergies: "", specialNeeds: "", attendingEvents: [],
    reasonForVisit: "", priorIndiaVisit: "no", hindiLevel: "none",
    photographyConsent: "yes", dressingHelp: "no",
    emergencyName: "", emergencyPhone: "", emergencyRelation: "",
    message: "", agreeTerms: false, agreePhotography: false,
  });

  const set    = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const handle = e => set(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value);

  useEffect(() => {
    (async () => {
      try {
        const [wr, ar] = await Promise.all([
          fetch(`${API_URL}/wedding/${weddingId}`),
          fetch(`${API_URL}/booking/availability/${weddingId}`),
        ]);
        const [wd, ad] = await Promise.all([wr.json(), ar.json()]);
        if (wr.ok) setWedding(wd.data);
        if (ar.ok) setAvailability(ad.data);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.guestName.trim())  e.guestName  = "Full name is required";
      if (!form.guestEmail.trim()) e.guestEmail = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.guestEmail)) e.guestEmail = "Enter a valid email";
      if (form.confirmEmail !== form.guestEmail) e.confirmEmail = "Emails do not match";
      if (!form.guestPhone.trim())  e.guestPhone  = "Phone number is required";
      if (!form.nationality.trim()) e.nationality = "Nationality is required";
    }
    if (s === 1) {
      if (!form.arrivalDate)   e.arrivalDate   = "Please enter your arrival date";
      if (!form.departureDate) e.departureDate = "Please enter your departure date";
    }
    if (s === 2) {
      if (!form.emergencyName.trim())  e.emergencyName  = "Emergency contact name is required";
      if (!form.emergencyPhone.trim()) e.emergencyPhone = "Emergency phone is required";
      if (!form.agreeTerms)            e.agreeTerms     = "You must agree to the terms";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const e = validate(2);
    if (Object.keys(e).length) { setErrors(e); return; }
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setSubmitting(true); setServerError("");
    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          weddingId, seats: Number(form.seats),
          guestName: form.guestName, guestEmail: form.guestEmail,
          guestPhone: form.guestPhone, nationality: form.nationality,
          countryOfResidence: form.countryOfResidence,
          passportNumber: form.passportNumber, dateOfBirth: form.dateOfBirth,
          gender: form.gender, arrivalDate: form.arrivalDate,
          departureDate: form.departureDate,
          accommodationNeeded: form.accommodationNeeded,
          dietaryPreference: form.dietaryPreference,
          allergies: form.allergies, specialNeeds: form.specialNeeds,
          attendingEvents: form.attendingEvents,
          reasonForVisit: form.reasonForVisit,
          priorIndiaVisit: form.priorIndiaVisit, hindiLevel: form.hindiLevel,
          photographyConsent: form.photographyConsent,
          dressingHelp: form.dressingHelp,
          emergencyContact: {
            name: form.emergencyName, phone: form.emergencyPhone,
            relation: form.emergencyRelation,
          },
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed.");
      const bookingId = data.data?._id || data.data?.id;
      if (bookingId) {
        navigate(`/booking/${bookingId}/pass`);
      } else {
        setStep(3);
      }
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── loading / not found ── */
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Loading wedding details…</p>
      </div>
    </div>
  );

  if (!wedding) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-sm text-gray-400">Wedding not found.</p>
    </div>
  );

  const spotsLeft  = availability?.spotsLeft;
  const spotsTotal = availability?.guestCapacity;
  const spotsPercent = spotsTotal ? Math.round(((spotsTotal - spotsLeft) / spotsTotal) * 100) : 0;
  const totalPrice = wedding.pricePerPerson ? form.seats * wedding.pricePerPerson : null;

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={`/weddings/${weddingId}`}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to wedding
          </Link>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-orange-500">Ree</span><span className="text-gray-800">waayat</span>
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-600 font-medium">Secure booking</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* ══════ LEFT — FORM ══════ */}
        <div>

          {/* SUCCESS STATE */}
          {step === 3 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full
                flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                You're confirmed! 🎊
              </h2>
              <p className="text-gray-500 text-base max-w-md mx-auto mb-1">
                Your seat at{" "}
                <span className="text-gray-800 font-semibold">
                  {wedding.bride?.firstName} & {wedding.groom?.firstName}'s wedding
                </span>{" "}
                is reserved.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Confirmation sent to{" "}
                <span className="text-orange-500 font-medium">{form.guestEmail}</span>
              </p>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-left max-w-md mx-auto mb-8">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">
                  What happens next
                </p>
                {[
                  { icon: Mail,     text: "Check your email for your booking confirmation" },
                  { icon: Phone,    text: "The host family will contact you within 48 hours" },
                  { icon: Shirt,    text: "Review the attire guide in your confirmation email" },
                  { icon: Calendar, text: "Add the wedding dates to your calendar" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-orange-100 last:border-0">
                    <s.icon className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Link to="/weddings"
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:border-gray-300
                    hover:text-gray-800 rounded-xl text-sm font-semibold transition-colors">
                  Browse more weddings
                </Link>
                <Link to="/"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white
                    rounded-xl text-sm font-bold transition-colors shadow-sm shadow-orange-200">
                  Go home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* form card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                <div className="mb-7">
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Reserve your seat
                  </h1>
                  <p className="text-sm text-gray-400">
                    {wedding.bride?.firstName} & {wedding.groom?.firstName}'s wedding ·{" "}
                    {wedding.weddingLocation}
                  </p>
                </div>

                <StepBar
                  current={step}
                  steps={["Personal Info", "Visit Details", "Preferences & Confirm"]}
                />

                {serverError && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200
                    text-red-600 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{serverError}
                  </div>
                )}

                {/* ─── STEP 0: Personal Info ─── */}
                {step === 0 && (
                  <div className="space-y-5">
                    <FormSection
                      icon={User}
                      title="Personal Information"
                      subtitle="Your details help the host family prepare your guest pass and venue entry."
                    />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full name" required error={errors.guestName}>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input name="guestName" value={form.guestName} onChange={handle}
                            placeholder="As on your passport"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>

                      <Field label="Gender" hint="Optional">
                        <select name="gender" value={form.gender} onChange={handle} className={selectCls}>
                          <option value="">Select gender</option>
                          <option>Male</option><option>Female</option>
                          <option>Non-binary</option><option>Prefer not to say</option>
                        </select>
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Email address" required error={errors.guestEmail}>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input type="email" name="guestEmail" value={form.guestEmail} onChange={handle}
                            placeholder="you@example.com"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>
                      <Field label="Confirm email" required error={errors.confirmEmail}>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input type="email" name="confirmEmail" value={form.confirmEmail} onChange={handle}
                            placeholder="Re-enter email"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Phone (with country code)" required error={errors.guestPhone} hint="e.g. +1 555 0100">
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input name="guestPhone" value={form.guestPhone} onChange={handle}
                            placeholder="+1 555 0100"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>
                      <Field label="Date of birth" hint="For age-restricted events">
                        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handle}
                          className={inputCls} />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Nationality" required error={errors.nationality}>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input name="nationality" value={form.nationality} onChange={handle}
                            placeholder="e.g. American, British"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>
                      <Field label="Country of residence">
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                          <input name="countryOfResidence" value={form.countryOfResidence} onChange={handle}
                            placeholder="Where you currently live"
                            className={inputCls + " pl-10"} />
                        </div>
                      </Field>
                    </div>

                    <Field label="Passport number" hint="Optional — required at some venues">
                      <input name="passportNumber" value={form.passportNumber} onChange={handle}
                        placeholder="For venue entry formalities"
                        className={inputCls} />
                    </Field>

                    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100
                      rounded-xl px-4 py-3 text-sm text-blue-700">
                      <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                      Your passport details are shared only with the host family for venue entry.
                      We never display them publicly.
                    </div>
                  </div>
                )}

                {/* ─── STEP 1: Visit Details ─── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <FormSection
                      icon={Calendar}
                      title="Visit Details"
                      subtitle="Help the family prepare for your arrival and tailor your experience."
                    />

                    {/* seats counter */}
                    <Field label="Number of seats" required
                      hint={spotsLeft != null ? `${spotsLeft} of ${spotsTotal} spots remaining` : undefined}>
                      <div className="flex items-center gap-4 mt-1">
                        <button type="button"
                          onClick={() => set("seats", Math.max(1, form.seats - 1))}
                          className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700
                            font-bold text-xl transition-colors border border-gray-200">
                          −
                        </button>
                        <span className="text-2xl font-black text-gray-800 w-8 text-center">{form.seats}</span>
                        <button type="button"
                          onClick={() => set("seats", Math.min(spotsLeft || 10, form.seats + 1))}
                          className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700
                            font-bold text-xl transition-colors border border-gray-200">
                          +
                        </button>
                        {totalPrice && (
                          <div className="ml-3 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl">
                            <span className="text-orange-600 font-black text-lg">
                              ${totalPrice.toLocaleString()}
                            </span>
                            <span className="text-orange-400 text-xs ml-1">total</span>
                          </div>
                        )}
                      </div>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Arrival date in India" required error={errors.arrivalDate}>
                        <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handle}
                          className={inputCls} />
                      </Field>
                      <Field label="Departure date" required error={errors.departureDate}>
                        <input type="date" name="departureDate" value={form.departureDate} onChange={handle}
                          className={inputCls} />
                      </Field>
                    </div>

                    <Field label="Accommodation help needed?">
                      <select name="accommodationNeeded" value={form.accommodationNeeded} onChange={handle}
                        className={selectCls}>
                        <option value="no">No — I've arranged my own stay</option>
                        <option value="nearby">Yes — suggest hotels near the venue</option>
                        <option value="family">Yes — I'd like to stay with a local family</option>
                      </select>
                    </Field>

                    <Field label="Dietary preference">
                      <select name="dietaryPreference" value={form.dietaryPreference} onChange={handle}
                        className={selectCls}>
                        <option value="no_preference">No preference — I'll eat everything</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="jain">Jain (no root vegetables)</option>
                        <option value="halal">Halal</option>
                        <option value="gluten_free">Gluten-free</option>
                        <option value="other">Other (describe below)</option>
                      </select>
                    </Field>

                    <Field label="Food allergies or restrictions" hint="Optional">
                      <input name="allergies" value={form.allergies} onChange={handle}
                        placeholder="e.g. nut allergy, lactose intolerant"
                        className={inputCls} />
                    </Field>

                    {/* events checkboxes */}
                    {wedding.events?.length > 0 && (
                      <Field label="Which events do you want to attend?">
                        <div className="space-y-2 mt-1">
                          {wedding.events.map((ev, i) => {
                            const id = ev._id || ev.name;
                            const checked = form.attendingEvents.includes(id);
                            return (
                              <label key={i}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer
                                  transition-all duration-200 ${
                                    checked
                                      ? "bg-orange-50 border-orange-300"
                                      : "bg-white border-gray-200 hover:border-gray-300"
                                  }`}>
                                <input type="checkbox" checked={checked}
                                  onChange={(e) => {
                                    set("attendingEvents", e.target.checked
                                      ? [...form.attendingEvents, id]
                                      : form.attendingEvents.filter(x => x !== id));
                                  }}
                                  className="accent-orange-500 w-4 h-4 shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">{ev.name}</p>
                                  {ev.date && <p className="text-xs text-gray-400 mt-0.5">{fmt(ev.date)}</p>}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </Field>
                    )}

                    <Field label="Special needs or accessibility requirements" hint="Optional">
                      <textarea name="specialNeeds" value={form.specialNeeds} onChange={handle}
                        rows={2} placeholder="Wheelchair access, hearing assistance, etc."
                        className={inputCls + " resize-none"} />
                    </Field>
                  </div>
                )}

                {/* ─── STEP 2: Preferences & Confirm ─── */}
                {step === 2 && (
                  <div className="space-y-5">
                    <FormSection
                      icon={Star}
                      title="Experience Preferences"
                      subtitle="Help the host personalise your experience and keep you safe."
                    />

                    <Field label="Why do you want to attend this wedding?">
                      <select name="reasonForVisit" value={form.reasonForVisit} onChange={handle}
                        className={selectCls}>
                        <option value="">Select reason</option>
                        <option value="cultural_curiosity">Cultural curiosity / travel experience</option>
                        <option value="photography">Photography / videography interest</option>
                        <option value="academic">Academic / research</option>
                        <option value="friend_referred">Referred by a friend or family</option>
                        <option value="repeat_guest">I attended an Indian wedding before and loved it</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Have you visited India before?">
                        <select name="priorIndiaVisit" value={form.priorIndiaVisit} onChange={handle}
                          className={selectCls}>
                          <option value="no">No — first time</option>
                          <option value="once">Yes, once</option>
                          <option value="multiple">Yes, multiple times</option>
                        </select>
                      </Field>
                      <Field label="Hindi / local language level">
                        <select name="hindiLevel" value={form.hindiLevel} onChange={handle}
                          className={selectCls}>
                          <option value="none">None — I'll need translation help</option>
                          <option value="basic">Basic — I know a few words</option>
                          <option value="conversational">Conversational</option>
                          <option value="fluent">Fluent</option>
                        </select>
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Photography & video consent">
                        <select name="photographyConsent" value={form.photographyConsent} onChange={handle}
                          className={selectCls}>
                          <option value="yes">Yes — I consent to being photographed</option>
                          <option value="no">No — please do not photograph me</option>
                          <option value="ask">Ask me on the day</option>
                        </select>
                      </Field>
                      <Field label="Help with traditional dressing?">
                        <select name="dressingHelp" value={form.dressingHelp} onChange={handle}
                          className={selectCls}>
                          <option value="no">No — I'll manage on my own</option>
                          <option value="yes">Yes — saree / sherwani help please</option>
                          <option value="maybe">Maybe — depends on the event</option>
                        </select>
                      </Field>
                    </div>

                    {/* emergency contact */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-amber-800">
                            Emergency Contact <span className="text-orange-500">*</span>
                          </p>
                          <p className="text-xs text-amber-600 mt-0.5">
                            Required by Indian tourism guidelines. Only contacted in an emergency.
                          </p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Contact name" required error={errors.emergencyName}>
                          <input name="emergencyName" value={form.emergencyName} onChange={handle}
                            placeholder="Full name" className={inputCls} />
                        </Field>
                        <Field label="Contact phone" required error={errors.emergencyPhone}>
                          <input name="emergencyPhone" value={form.emergencyPhone} onChange={handle}
                            placeholder="+1 555 0100" className={inputCls} />
                        </Field>
                      </div>
                      <Field label="Relationship">
                        <select name="emergencyRelation" value={form.emergencyRelation} onChange={handle}
                          className={selectCls}>
                          <option value="">Select relationship</option>
                          <option>Spouse / Partner</option>
                          <option>Parent</option>
                          <option>Sibling</option>
                          <option>Friend</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Message to the couple" hint="Optional">
                      <textarea name="message" value={form.message} onChange={handle} rows={3}
                        placeholder="Share a warm message with the family — they'll love hearing from you 💌"
                        className={inputCls + " resize-none"} />
                    </Field>

                    {/* consent */}
                    <div className="space-y-3">
                      {[
                        {
                          name: "agreeTerms",
                          label: "I agree to Reewaayat's Terms of Service, Privacy Policy and Wedding Guest Code of Conduct.",
                          error: errors.agreeTerms,
                        },
                        {
                          name: "agreePhotography",
                          label: "I understand that photographs and videos may be taken and could be used in Reewaayat's promotional materials.",
                        },
                      ].map((c, i) => (
                        <label key={i}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                            transition-all duration-200 ${
                              c.error
                                ? "bg-red-50 border-red-300"
                                : form[c.name]
                                  ? "bg-orange-50 border-orange-300"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                            }`}>
                          <input type="checkbox" name={c.name}
                            checked={form[c.name]} onChange={handle}
                            className="accent-orange-500 w-4 h-4 mt-0.5 shrink-0" />
                          <span className="text-xs text-gray-600 leading-relaxed">{c.label}</span>
                        </label>
                      ))}
                      {errors.agreeTerms && (
                        <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium ml-1">
                          <AlertCircle className="w-3 h-3" />{errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── nav buttons ── */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  {step > 0 ? (
                    <button onClick={back}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-800
                        text-sm font-semibold transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <Link to={`/weddings/${weddingId}`}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-800
                        text-sm font-semibold transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Cancel
                    </Link>
                  )}

                  {step < 2 ? (
                    <button onClick={next}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white
                        font-bold px-8 py-3 rounded-xl text-sm transition-colors
                        shadow-md shadow-orange-200">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={submit} disabled={submitting}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                        disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold
                        px-8 py-3 rounded-xl text-sm transition-colors shadow-md shadow-orange-200">
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Confirming…
                        </>
                      ) : (
                        <>Confirm Reservation <CheckCircle className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ══════ RIGHT — SUMMARY CARD ══════ */}
        {step < 3 && (
          <div className="lg:sticky lg:top-24 self-start space-y-4">

            {/* wedding card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={wedding.listingPhotoURL ||
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"}
                  alt="Wedding"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                {wedding.weddingCategory && (
                  <span className="inline-block text-[10px] bg-orange-100 text-orange-600 border border-orange-200
                    px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2">
                    {wedding.weddingCategory}
                  </span>
                )}
                <h3 className="text-base font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {wedding.weddingTitle ||
                    `${wedding.bride?.firstName} & ${wedding.groom?.firstName}'s Wedding`}
                </h3>

                <div className="space-y-2">
                  {[
                    { icon: MapPin,    val: wedding.weddingLocation },
                    { icon: Calendar, val: wedding.weddingStartDate
                        ? `${fmt(wedding.weddingStartDate)}${wedding.weddingEndDate ? ` – ${fmt(wedding.weddingEndDate)}` : ""}`
                        : null },
                    { icon: Users,    val: spotsLeft != null ? `${spotsLeft} of ${spotsTotal} seats left` : null },
                  ].filter(r => r.val).map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <r.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />{r.val}
                    </div>
                  ))}
                </div>

                {/* availability bar */}
                {spotsTotal && (
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>{spotsPercent}% filled</span>
                      <span>{spotsLeft} spots left</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                        style={{ width: `${spotsPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* price breakdown */}
              {wedding.pricePerPerson && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${wedding.pricePerPerson} × {form.seats} seat{form.seats > 1 ? "s" : ""}</span>
                    <span className="font-semibold text-gray-800">${totalPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Service fee</span><span>Included</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-orange-500">${totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* trust badges */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
              {[
                { icon: Shield, label: "Verified authentic wedding",  color: "text-green-500 bg-green-50" },
                { icon: Lock,   label: "Bank-grade data encryption",  color: "text-blue-500 bg-blue-50" },
                { icon: Star,   label: "4.8/5 guest satisfaction",    color: "text-yellow-500 bg-yellow-50" },
                { icon: Heart,  label: "Welcomed as family",          color: "text-rose-500 bg-rose-50" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${t.color}`}>
                    <t.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{t.label}</span>
                </div>
              ))}
            </div>

            {/* step hint */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                Step {step + 1} of 3
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {step === 0 && "We need your personal details to prepare your guest pass and for venue entry."}
                {step === 1 && "Tell us your visit dates and food preferences so the family can prepare."}
                {step === 2 && "Final preferences, emergency contact, and confirmation."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}