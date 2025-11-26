import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

function Login({ isOpen, onClose, onLoginSuccess }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ⭐ GOOGLE LOGIN
  const googleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  // ⭐ EMAIL LOGIN (Backend API)
  const emailLogin = async () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save tokens
      localStorage.setItem("access-token", data.data.accessToken);
      localStorage.setItem("refresh-token", data.data.refreshToken);

      alert("Login successful!");
      onLoginSuccess?.();
      onClose();
    } else {
      alert(data.error?.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Log in or sign up
          </h1>
          <p className="text-gray-600 leading-relaxed">
            To register a wedding, please log in to your account below.
          </p>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-500 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Important Notice
              </h3>
              <p className="text-blue-800 text-sm">
                Facebook login is currently unavailable.
              </p>
            </div>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="space-y-3">
          {/* Google Login */}
          <button
            onClick={googleLogin}
            className="flex items-center justify-center w-full border rounded-lg py-3 mb-3 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Email Login */}
          <button
            onClick={emailLogin}
            disabled={loading}
            className="flex items-center justify-center w-full border rounded-lg py-3 hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "📧 Continue with email"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 -mx-6 -mb-6 bg-orange-950 rounded-b-lg p-4">
          <div className="text-center">
            <div className="text-white text-sm opacity-90">
              Secure login powered by MyWeddingTour
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
