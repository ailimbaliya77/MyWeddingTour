import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle, XCircle, Search, Shield, ArrowLeft,
  User, MapPin, Calendar, Users, Clock, RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function fmt(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function PassVerification() {
  const [passCode,   setPassCode]   = useState("");
  const [result,     setResult]     = useState(null); // null | "valid" | "invalid"
  const [booking,    setBooking]    = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [history,    setHistory]    = useState([]); // last 5 scans

  const verify = async () => {
    const code = passCode.trim().toUpperCase();
    if (!code) return;
    setLoading(true); setError(""); setResult(null); setBooking(null);

    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      const res = await fetch(`${API_URL}/booking/verify/${code}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok || !data.data) {
        setResult("invalid");
        setHistory(h => [
          { code, status: "invalid", time: new Date() },
          ...h.slice(0, 4),
        ]);
      } else {
        setResult("valid");
        setBooking(data.data);
        setHistory(h => [
          { code, status: "valid", name: data.data.guestName, time: new Date() },
          ...h.slice(0, 4),
        ]);
      }
    } catch (err) {
      setError("Could not connect to server. Check your connection.");
      setResult("invalid");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPassCode(""); setResult(null); setBooking(null); setError("");
  };

  const handleKey = (e) => { if (e.key === "Enter") verify(); };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/host/dashboard"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <span className="text-xl font-extrabold">
            <span className="text-orange-500">Ree</span>
            <span className="text-gray-800">waayat</span>
          </span>
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <Shield className="w-3.5 h-3.5 text-green-500" /> Host Verified
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-orange-50 border border-orange-200 rounded-2xl
            flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Guest Pass Verification
          </h1>
          <p className="text-sm text-gray-400">
            Enter the guest's pass code or scan their QR code to verify entry.
          </p>
        </div>

        {/* ── INPUT BOX ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Enter pass code
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-300" />
              <input
                type="text"
                value={passCode}
                onChange={e => setPassCode(e.target.value.toUpperCase())}
                onKeyDown={handleKey}
                placeholder="e.g. RW-2024-XK9M2"
                maxLength={20}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3
                  text-sm font-mono font-bold text-gray-800 placeholder-gray-300 tracking-wider
                  focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <button
              onClick={verify}
              disabled={loading || !passCode.trim()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50
                disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm
                transition-colors shadow-sm shadow-orange-200 flex items-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {loading ? "Checking…" : "Verify"}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium mt-2 ml-1">{error}</p>
          )}

          <p className="text-xs text-gray-400 mt-3">
            The pass code is printed on the guest's ticket and also available in their booking email.
          </p>
        </div>

        {/* ── RESULT: VALID ── */}
        {result === "valid" && booking && (
          <div className="bg-white border-2 border-green-400 rounded-2xl overflow-hidden shadow-sm
            shadow-green-100 mb-6 animate-in fade-in duration-300">

            {/* green header */}
            <div className="bg-green-500 px-6 py-4 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-white" />
              <div>
                <p className="text-white font-black text-lg">Valid Pass ✓</p>
                <p className="text-green-100 text-xs">This guest is authorized to attend</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-white font-mono font-bold text-sm">{booking.passCode}</p>
                <p className="text-green-200 text-[10px]">Pass code</p>
              </div>
            </div>

            {/* guest details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Guest name</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{booking.guestName}</p>
                    <p className="text-xs text-gray-400">{booking.nationality}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Seats booked</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {booking.seats || 1} guest{(booking.seats || 1) > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-400">{booking.dietaryPreference?.replace("_", " ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Booking date</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {booking.createdAt ? fmt(booking.createdAt) : "—"}
                    </p>
                    <p className="text-xs text-gray-400">Confirmed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Country</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {booking.countryOfResidence || booking.nationality || "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.priorIndiaVisit === "no" ? "First India visit" : "Visited India before"}
                    </p>
                  </div>
                </div>
              </div>

              {/* special notes */}
              {(booking.specialNeeds || booking.allergies || booking.dressingHelp === "yes") && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    ⚠ Host notes for this guest
                  </p>
                  <div className="space-y-1">
                    {booking.specialNeeds && (
                      <p className="text-xs text-amber-800">• Special needs: {booking.specialNeeds}</p>
                    )}
                    {booking.allergies && (
                      <p className="text-xs text-amber-800">• Allergies: {booking.allergies}</p>
                    )}
                    {booking.dressingHelp === "yes" && (
                      <p className="text-xs text-amber-800">• Needs help with traditional dressing</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={reset}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 hover:border-gray-300
                    rounded-xl text-sm font-semibold transition-colors">
                  Verify another pass
                </button>
                <button
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white
                    rounded-xl text-sm font-bold transition-colors">
                  ✓ Mark as checked in
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT: INVALID ── */}
        {result === "invalid" && !booking && (
          <div className="bg-white border-2 border-red-400 rounded-2xl overflow-hidden shadow-sm
            shadow-red-100 mb-6">
            <div className="bg-red-500 px-6 py-4 flex items-center gap-3">
              <XCircle className="w-7 h-7 text-white" />
              <div>
                <p className="text-white font-black text-lg">Invalid Pass ✗</p>
                <p className="text-red-100 text-xs">This code is not recognised or has expired</p>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-4">
                Double-check the code with the guest's ticket or email. If the problem persists,
                contact Reewaayat support.
              </p>
              <button onClick={reset}
                className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white
                  rounded-xl text-sm font-bold transition-colors">
                Try again
              </button>
            </div>
          </div>
        )}

        {/* ── SCAN HISTORY ── */}
        {history.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Recent verifications
            </p>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b
                  border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      h.status === "valid" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {h.status === "valid"
                        ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        : <XCircle className="w-3.5 h-3.5 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-700">{h.code}</p>
                      {h.name && <p className="text-xs text-gray-400">{h.name}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${
                      h.status === "valid" ? "text-green-600" : "text-red-500"
                    }`}>
                      {h.status === "valid" ? "Valid" : "Invalid"}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {h.time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* tip box */}
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            💡 Verification tips
          </p>
          <div className="space-y-1.5">
            {[
              "Pass codes are case-insensitive — RW-2024-XK9M2 = rw-2024-xk9m2",
              "Each pass code is unique — one code = one booking (may cover multiple seats)",
              "If a guest forgot their code, look up their name in your Host Dashboard → Bookings",
              "Mark guests as checked-in so you know who has arrived",
            ].map((tip, i) => (
              <p key={i} className="text-xs text-blue-700 leading-relaxed">• {tip}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}