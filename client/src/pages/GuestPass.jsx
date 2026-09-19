import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar, MapPin, Users, Shield, CheckCircle,
  Download, Share2, ArrowLeft, Clock, Heart,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function fmt(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

/* ── Barcode SVG (visual only — decorative) ── */
function Barcode({ code }) {
  const bars = code?.split("").map((c) => c.charCodeAt(0)) || [];
  return (
    <div className="flex items-end gap-[2px] h-10">
      {[...Array(40)].map((_, i) => {
        const h = 40 - (bars[i % bars.length] % 20);
        const w = i % 5 === 0 ? 3 : 1;
        return (
          <div
            key={i}
            style={{ height: `${h}px`, width: `${w}px` }}
            className="bg-white/70 rounded-sm"
          />
        );
      })}
    </div>
  );
}

/* ── QR placeholder (replace with real QR library if needed) ── */
function QRCode({ value }) {
  return (
    <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center">
      <div className="w-full h-full grid grid-cols-5 gap-0.5">
        {[...Array(25)].map((_, i) => {
          const corners = [0,1,5,6,4,9,20,21,24,23,15,16];
          const filled = corners.includes(i) || Math.abs(value?.charCodeAt(i % value.length) % 3) === 0;
          return (
            <div key={i} className={`rounded-[1px] ${filled ? "bg-gray-900" : "bg-white"}`} />
          );
        })}
      </div>
    </div>
  );
}

export default function GuestPass() {
  const { bookingId } = useParams();
  const passRef = useRef(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
        const res   = await fetch(`${API_URL}/booking/${bookingId}/pass`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Could not load pass");
        setBooking(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(booking?.passCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Wedding Guest Pass — Reewaayat",
        text: `My guest pass code: ${booking?.passCode}`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !booking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
      <div>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Pass not found</h2>
        <p className="text-sm text-gray-400 mb-6">{error || "This pass doesn't exist or you don't have access."}</p>
        <Link to="/weddings" className="text-orange-500 text-sm font-semibold">← Browse weddings</Link>
      </div>
    </div>
  );

  const w = booking.wedding;
  const passCode = booking.passCode || `RW-${bookingId?.slice(-8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">

      {/* top bar — hidden on print */}
      <div className="print:hidden bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/weddings"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> My bookings
          </Link>
          <span className="text-xl font-extrabold">
            <span className="text-orange-500">Ree</span>
            <span className="text-gray-800">waayat</span>
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500
                hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-semibold text-white
                bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 print:py-4 print:px-0">

        {/* header text */}
        <div className="text-center mb-8 print:hidden">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200
            text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <CheckCircle className="w-3.5 h-3.5" /> Booking confirmed
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Guest Pass is ready
          </h1>
          <p className="text-sm text-gray-400">
            Show this pass at the venue entrance. Screenshot or download it.
          </p>
        </div>

        {/* ══════ THE PASS ══════ */}
        <div ref={passRef}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/20 print:shadow-none">

          {/* ── TOP HALF: dark maroon ticket ── */}
          <div className="bg-[#8B2500] relative overflow-hidden">

            {/* decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative z-10 grid grid-cols-[1fr_auto_1fr]">

              {/* LEFT stub */}
              <div className="p-8 pr-6 flex flex-col justify-between min-h-[220px]">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-3">
                    Admit · {booking.seats || 1} Guest{(booking.seats || 1) > 1 ? "s" : ""}
                  </p>
                  <h2 className="text-2xl font-black text-white leading-tight mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    The Guest Pass
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Everything you need for the full celebration, in a single booking.
                  </p>
                </div>

                {/* barcode */}
                <div className="mt-6">
                  <Barcode code={passCode} />
                  <p className="text-[10px] text-white/40 mt-2 tracking-widest font-mono">
                    {passCode}
                  </p>
                </div>
              </div>

              {/* TEAR LINE */}
              <div className="flex flex-col items-center justify-between py-4 relative">
                <div className="w-px flex-1 border-l-2 border-dashed border-white/20" />
                <div className="w-6 h-6 rounded-full bg-gray-50 shrink-0 -mx-3 z-10" />
                <div className="w-px flex-1 border-l-2 border-dashed border-white/20" />
              </div>

              {/* RIGHT stub */}
              <div className="p-8 pl-6 flex flex-col justify-between">
                {/* what's included */}
                <div className="space-y-3">
                  {[
                    "Every ceremony, feast & celebration",
                    "A verified, background-checked host family",
                    "On-ground concierge for attire & etiquette",
                    "One upfront price — no surprise fees",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-2.5 h-2.5 text-white/70" />
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* QR code */}
                <div className="mt-6">
                  <QRCode value={passCode} />
                  <p className="text-[10px] text-white/40 mt-2">Scan to verify</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM HALF: white info strip ── */}
          <div className="bg-white border-t-2 border-dashed border-gray-200 px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Guest</p>
                <p className="text-sm font-bold text-gray-900">{booking.guestName}</p>
                <p className="text-xs text-gray-400">{booking.nationality}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Wedding</p>
                <p className="text-sm font-bold text-gray-900">
                  {w?.weddingTitle || `${w?.bride?.firstName} & ${w?.groom?.firstName}`}
                </p>
                <p className="text-xs text-gray-400">{w?.weddingCategory}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                <p className="text-sm font-bold text-gray-900">
                  {w?.weddingStartDate ? fmt(w.weddingStartDate) : "TBD"}
                </p>
                {w?.weddingEndDate && (
                  <p className="text-xs text-gray-400">to {fmt(w.weddingEndDate)}</p>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-bold text-gray-900">{w?.weddingLocation || "India"}</p>
                <p className="text-xs text-gray-400">Venue details in email</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                <span className="text-[10px] text-gray-400 font-medium">
                  Verified by Reewaayat · Pass ID: {passCode}
                </span>
              </div>
              <span className="text-[10px] font-extrabold tracking-tight">
                <span className="text-orange-500">Ree</span>
                <span className="text-gray-400">waayat</span>
              </span>
            </div>
          </div>
        </div>

        {/* pass code copy box */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 print:hidden">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Your pass code</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3
              font-mono text-lg font-black text-gray-800 tracking-widest">
              {passCode}
            </div>
            <button onClick={handleCopy}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Share this code with the host family or show your QR at the entrance.
          </p>
        </div>

        {/* what to do next */}
        <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl p-5 print:hidden">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">
            Before you arrive
          </p>
          <div className="space-y-2.5">
            {[
              { icon: Download,  text: "Download or screenshot this pass — you'll need it at the venue" },
              { icon: Clock,     text: "Arrive 15 mins before the ceremony start time" },
              { icon: Heart,     text: "Bring a small gift — it's customary and deeply appreciated" },
              { icon: Users,     text: "Your guide will meet you at the venue entrance" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <s.icon className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}