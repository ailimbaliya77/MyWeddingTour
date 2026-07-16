import React, { useState } from "react";
import { X, Mail } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const roleCopy = {
  planner: {
    heading: "Create your planner account",
  },
  couple: {
    heading: "Create your account",
  },
};

/**
 * Create Account Modal
 * ---------------------
 * Matches the mockup: Gmail button + mobile number/OTP flow.
 *
 * ✅ "Continue with Gmail" is fully wired — reuses your existing
 *    GET /auth/google flow (same as the Login modal).
 *
 * ⚠️ Mobile number + OTP is UI-only right now. Your backend
 *    (auth.controller.js / auth.routes.js) has no OTP/SMS system —
 *    only email+password (authLogin) and Google OAuth (authGoogle) exist.
 *    To make this real you'd need:
 *      1. An SMS provider (Twilio, MSG91, etc.)
 *      2. POST /auth/send-otp  { phone }
 *      3. POST /auth/verify-otp { phone, otp } -> returns accessToken/refreshToken
 *    Until then, "Send OTP" / "Verify & Continue" below just simulate the
 *    UI state so you can see the flow — swap the two TODO fetch calls in
 *    once those endpoints exist.
 */
const CreateAccountModal = ({ isOpen, onClose, role = "couple", setGoogleLoginInProgress }) => {
  const [countryCode] = useState("+91 India");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const copy = roleCopy[role] || roleCopy.couple;

  const handleGmail = () => {
    setGoogleLoginInProgress?.(true);
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleSendOtp = async () => {
    setError("");
    if (!mobile.trim()) {
      setError("Enter your mobile number");
      return;
    }
    setLoading(true);
    try {
      // TODO: replace with real call once backend supports it
      // await fetch(`${API_URL}/auth/send-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone: `${countryCode}${mobile}`, role }),
      // });
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Could not send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // digits only, one char
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    // auto-advance to next box
    if (value && index < 3) {
      document.getElementById(`otp-box-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");
    if (code.length !== 4) {
      setError("Enter the 4-digit code");
      return;
    }
    setLoading(true);
    try {
      // TODO: replace with real call once backend supports it
      // const res = await fetch(`${API_URL}/auth/verify-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone: `${countryCode}${mobile}`, otp: code, role }),
      // });
      // const data = await res.json();
      // localStorage.setItem("token", data.data.accessToken);
      // localStorage.setItem("accessToken", data.data.accessToken);

      alert("OTP backend not implemented yet — see TODO comments in CreateAccountModal.jsx");
    } catch (err) {
      console.error(err);
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-sm font-semibold text-gray-500 mb-1">MyWeddingTour</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{copy.heading}</h2>
        <p className="text-sm text-gray-500 mb-6 pr-6">
          Sign up using your mobile number or Gmail, then verify with a one-time password.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Gmail */}
        <p className="text-sm font-medium text-gray-700 mb-2">Continue with Gmail</p>
        <button
          onClick={handleGmail}
          className="w-full flex items-center justify-center gap-2 py-3 bg-orange-50 hover:bg-orange-100 rounded-xl font-medium text-gray-800 transition mb-5"
        >
          <Mail className="w-4 h-4" />
          Continue with Gmail
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or use mobile number</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Mobile number */}
        <p className="text-sm font-medium text-gray-700 mb-2">Mobile number</p>
        <div className="flex gap-2 mb-4">
          <select className="border rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white">
            <option>{countryCode}</option>
          </select>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            className="flex-1 border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 mb-5"
        >
          {loading && !otpSent ? "Sending…" : "Send OTP"}
        </button>

        {/* OTP */}
        {otpSent && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-2">Enter OTP</p>
            <div className="flex gap-2 mb-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-box-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-full text-center border rounded-lg py-2.5 text-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs mb-5">
              <span className="text-gray-400">
                OTP sent to {countryCode.split(" ")[0]} •••• ••{mobile.slice(-3)}
              </span>
              <button onClick={handleSendOtp} className="text-orange-600 font-medium hover:underline">
                Resend OTP
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 mb-4"
            >
              {loading ? "Verifying…" : "Verify & Continue"}
            </button>
          </>
        )}

        <p className="text-xs text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <span className="text-orange-600">Terms</span> and{" "}
          <span className="text-orange-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default CreateAccountModal;