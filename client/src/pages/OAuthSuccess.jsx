import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the access token from URL query params
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      // Store the access token in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('accessToken', accessToken);
      
      // Optional: Fetch user profile data with the token
      fetchUserProfile(accessToken);

      // Redirect to Step 1 registration page
      setTimeout(() => {
        navigate('/host/register/step1');
      }, 1000);
    } else {
      // No token found, redirect to home or login
      console.error('No access token found in URL');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [navigate, location]);

  // Fetch user profile from backend
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store email separately for easy access
        if (userData.email) {
          localStorage.setItem('userEmail', userData.email);
        }
        
        console.log('User profile fetched successfully:', userData);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
        {/* Success Animation */}
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

        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Authentication Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Redirecting you to registration...
        </p>

        {/* Progress dots */}
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