import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('accessToken', accessToken);

      // Set by RoleSelectionModal right before redirecting to Google.
      // "couple"  -> Bride/Groom quick path, go straight to the listing form
      // "planner" -> Wedding Planner path, also goes to the listing form
      //              (they can list multiple weddings from there over time)
      // (none)    -> normal "Log in instead" flow, send to their dashboard
      const pendingRole = localStorage.getItem('pendingRole');
      localStorage.removeItem('pendingRole');

      setTimeout(() => {
        if (pendingRole === 'couple' || pendingRole === 'planner') {
          navigate('/host/list-wedding');
        } else {
          navigate('/host/dashboard');
        }
      }, 1000);
    } else {
      console.error('No access token found in URL');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-teal-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Authentication Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Redirecting you to your dashboard...
        </p>

        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;