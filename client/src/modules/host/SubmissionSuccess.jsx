import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const SubmissionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Submitted for review</h1>
        <p className="text-gray-500 mb-8">
          Your wedding listing is being reviewed by our team. We'll notify you
          once it's approved and live for travelers to see.
        </p>
        <button
          onClick={() => navigate("/host/dashboard")}
          className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
        >
          Go to my dashboard
        </button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;