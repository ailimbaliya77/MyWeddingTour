import React from "react";
import { useNavigate } from "react-router-dom";

const HostStep5 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

const handleNext = () => {
  navigate("/weddings/register/step6"); 
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate("/weddings/register/step4");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      {/* Step Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S GET YOU READY TO BECOME A HOST
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-slate-600">STEP 5</span> Receive traveler contributions
      </p>

      {/* Info Box */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p>
          💰 From each traveler attending your wedding you will receive{" "}
          <b>60% of traveler contribution</b> (minimum of USD 60) as a wedding gift 
          through MyWeddingTour.
        </p>
        <p className="mt-2 font-semibold">Traveler contributions include:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access to wedding on the chosen day</li>
          <li>Connection with Ceremony Guide before the wedding</li>
          <li>Access to meals on the chosen day</li>
        </ul>
        <p className="mt-2 font-semibold">Traveler contributions should NOT include:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Transportation to the wedding venue</li>
          <li>Accommodation at the wedding</li>
        </ul>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How would you like to receive your wedding contribution?
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod || ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select a method</option>
          <option value="PayPal">PayPal</option>
          <option value="GooglePay">Google Pay (GPay)</option>
          <option value="BankTransfer">Bank Transfer</option>
          <option value="UPI">UPI ID</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Conditional Payment Fields */}
      {formData.paymentMethod === "PayPal" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PayPal Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="paypalEmail"
            value={formData.paypalEmail || ""}
            onChange={handleChange}
            placeholder="Your PayPal email"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {formData.paymentMethod === "GooglePay" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Pay (GPay) Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="gpayNumber"
            value={formData.gpayNumber || ""}
            onChange={handleChange}
            placeholder="Enter your GPay linked number"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {formData.paymentMethod === "BankTransfer" && (
        <div className="mb-6 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Bank Account Holder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg px-3 py-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            Bank Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber || ""}
            onChange={handleChange}
            placeholder="1234 5678 9101"
            className="w-full border rounded-lg px-3 py-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            IFSC / SWIFT Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc || ""}
            onChange={handleChange}
            placeholder="IFSC or SWIFT code"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {formData.paymentMethod === "UPI" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPI ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="upiId"
            value={formData.upiId || ""}
            onChange={handleChange}
            placeholder="example@upi"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {formData.paymentMethod === "Other" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specify Payment Method
          </label>
          <input
            type="text"
            name="otherPayment"
            value={formData.otherPayment || ""}
            onChange={handleChange}
            placeholder="Enter your payment details"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}

      {/* Info Box about payments */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-700">
        <p className="font-semibold mb-2">⏳ When will I receive the traveler contributions?</p>
        <p>
          Money collected from bookings will be deposited into MyWeddingTour’s account 
          and transferred to you after the last day of your wedding is over.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HostStep5;
