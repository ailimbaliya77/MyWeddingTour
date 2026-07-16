import React, { useState } from "react";
import { X, CalendarCheck, Heart } from "lucide-react";

/**
 * Role Selection Modal
 * ---------------------
 * Two roles map to different dashboards after account creation:
 *   - "planner": manages multiple weddings for clients  -> /host/dashboard (multi-listing view)
 *   - "couple":  hosting their own single wedding        -> /host/dashboard (single-listing view)
 *
 * ⚠️ Backend note: your UserModel currently only has `isPlanner: Boolean`.
 * To tell these two roles apart server-side (not just in the UI), you'll
 * want to add something like:
 *   plannerType: { type: String, enum: ["planner", "couple"], default: null }
 * and save it during registration.
 *
 * On Continue, this hands the chosen role to onContinue(role) — App.jsx
 * uses that to open CreateAccountModal with the right heading/copy.
 */
const RoleSelectionModal = ({ isOpen, onClose, onSwitchToLogin, onContinue, setGoogleLoginInProgress }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [selected, setSelected] = useState("planner");

  if (!isOpen) return null;

  const roles = [
    {
      id: "planner",
      icon: CalendarCheck,
      title: "Wedding Planner",
      desc: "I manage multiple weddings and want to list them for my clients.",
    },
    {
      id: "couple",
      icon: Heart,
      title: "Bride / Groom",
      desc: "I am hosting my own upcoming wedding and want to invite guests.",
    },
  ];

  const handleContinue = () => {
    // Remember the choice so OAuthSuccess.jsx knows where to land the user
    // after Google redirects back (dashboard vs. signup flow).
    localStorage.setItem("pendingRole", selected);

    if (selected === "couple") {
      // Bride/Groom: skip the signup form entirely, go straight to Google.
      onClose?.();
      setGoogleLoginInProgress?.(true);
      window.location.href = `${API_URL}/auth/google`;
      return;
    }

    // Wedding Planner: show the Create Account modal (Gmail or mobile OTP).
    onClose?.();
    onContinue?.(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md bg-orange-50 rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon badge */}
        <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 text-orange-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Welcome to MyWeddingTour
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 px-2">
          To provide you with the best experience, please tell us how you plan to use our platform.
        </p>

        {/* Role cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map(({ id, icon: Icon, title, desc }) => {
            const isActive = selected === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={`relative text-left p-4 rounded-xl border-2 transition ${
                  isActive
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* Radio indicator */}
                <span
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isActive ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                </span>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${
                    isActive ? "bg-orange-500" : "bg-gray-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                </div>

                <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
        >
          Continue to Dashboard →
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-orange-600 font-medium hover:underline"
          >
            Log in instead
          </button>
        </p>
      </div>
    </div>
  );
};

export default RoleSelectionModal;