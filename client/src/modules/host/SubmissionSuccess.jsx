import React from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper, ArrowRight } from "lucide-react";

const SubmissionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF1EF] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FCEBE7] rounded-full mb-5">
          <PartyPopper className="w-7 h-7 text-[#E1614A]" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3 font-serif">
          Listing Submitted!
        </h1>

        <p className="text-[#8B807C] mb-8 leading-relaxed">
          Thank you for sharing your culture. Your wedding listing has been
          received and is currently under review. We'll notify you once it's
          live on ShaadiPass.
        </p>

        <button
          onClick={() => navigate("/host/dashboard")}
          className="w-full py-3 bg-[#E1614A] text-white rounded-xl font-semibold hover:bg-[#C74E39] transition flex items-center justify-center gap-2"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;