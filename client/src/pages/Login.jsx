import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Mail } from 'lucide-react';

function Login({isOpen, onClose, onLoginSuccess}){

 const [show, setShow] = useState(false);
 
  useEffect(() => {
    if (isOpen) {
      // delay to trigger animation
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const fakeGoogleLogin = () => {
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Close button */}
        <button 
          onClick= {onClose}
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
            To register a wedding, please log in to your account below. If you don't 
            have an account yet, you can sign up for MyWeddingTour using the same 
            buttons.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                <span className="font-medium">Facebook login is currently unavailable.</span> Please use an alternative login 
                method for now. Thank you for your understanding!
              </p>
              <p className="text-blue-800 text-sm mt-3">
                If you are having problems logging in, please see the{' '}
                <a href="#" className="text-blue-600 underline hover:text-blue-700">
                  Technical troubleshooting
                </a>
                {' '}section of our FAQ.
              </p>
            </div>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="space-y-3">
          {/* Google Login */}
          <button
          onClick={fakeGoogleLogin}
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
          onClick={fakeGoogleLogin}
          className="flex items-center justify-center w-full border rounded-lg py-3 hover:bg-gray-100"
        >
          📧 Continue with email
        </button>
        </div>

        {/* Footer section with teal background */}
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

export default Login