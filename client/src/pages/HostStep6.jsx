import React from "react";
import { useNavigate } from "react-router-dom";

const HostStep6 = ({ formData, addWedding }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/weddings/register/step5");
  };

  const handleConfirm = () => {
    addWedding(formData); // save wedding into weddings list
    navigate("/weddings"); // redirect to weddings page
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S REVIEW YOUR DETAILS
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-teal-600">STEP 6</span> Overview & Confirmation
      </p>

      {/* Section 1: Bride & Groom */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">👰 Bride Information</h3>
        <p><b>First Name:</b> {formData.brideFirst || "N/A"}</p>
        <p><b>Last Name:</b> {formData.brideLast || "N/A"}</p>

        <h3 className="text-lg font-semibold text-teal-700 mt-4 mb-2">🤵 Groom Information</h3>
        <p><b>First Name:</b> {formData.groomFirst || "N/A"}</p>
        <p><b>Last Name:</b> {formData.groomLast || "N/A"}</p>
      </div>

      {/* Section 2: Contact */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">📞 Contact Details</h3>
        <p><b>Email:</b> {formData.email || "N/A"}</p>
        <p><b>Phone:</b> {formData.phone || "N/A"}</p>
      </div>

      {/* Section 3: About Yourselves */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">💍 About Yourselves</h3>
        {formData.image && (
          <img
            src={formData.image}
            alt="Wedding couple"
            className="w-48 h-48 rounded-lg object-cover mb-3"
          />
        )}
        <p><b>Your Story:</b> {formData.story || "N/A"}</p>
        <p><b>Engagement Video:</b> {formData.videoLink || "N/A"}</p>
      </div>

      {/* Section 4: Wedding Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">📅 Wedding Details</h3>
        <p><b>Days:</b> {formData.days || "N/A"}</p>
        <p><b>Food:</b> {formData.food || "N/A"}</p>
        <p><b>Alcohol:</b> {formData.alcohol || "N/A"}</p>
        <p>
          <b>Languages:</b>{" "}
          {Array.isArray(formData.languages)
            ? formData.languages.join(", ")
            : formData.languages || "N/A"}
        </p>
        <p><b>Location:</b> {formData.location || "N/A"}, {formData.city || ""}, {formData.country || ""}</p>
        <p><b>Venue:</b> {formData.venue || "N/A"}</p>

        {formData.events &&
          Array.isArray(formData.events) &&
          formData.events.map((event, index) => (
            <div key={index} className="p-3 border rounded-lg mt-2 bg-gray-50">
              <p><b>Event {index + 1}:</b> {event.name || "N/A"}</p>
              <p><b>Description:</b> {event.description || "N/A"}</p>
              <p><b>Dress Code:</b> {event.dressCode || "N/A"}</p>
              <p><b>Music/Dance:</b> {event.music ? "Yes" : "No"}</p>
            </div>
          ))}
      </div>

      {/* Section 5: Ceremony Guide */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">🎤 Ceremony Guide</h3>
        <p><b>Name:</b> {formData.guideFirst || ""} {formData.guideLast || ""}</p>
        <p><b>Email:</b> {formData.guideEmail || "N/A"}</p>
        <p><b>Phone:</b> {formData.guidePhone || "N/A"}</p>
        <p><b>Relation:</b> {formData.guideRelation || "N/A"}</p>
        <p>
          <b>Languages:</b>{" "}
          {Array.isArray(formData.guideLanguages)
            ? formData.guideLanguages.join(", ")
            : formData.guideLanguages || "N/A"}
        </p>
      </div>

      {/* Section 6: Payment Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">💳 Payment Details</h3>
        <p><b>Method:</b> {formData.paymentMethod || "N/A"}</p>
        {formData.paymentMethod === "PayPal" && (
          <p><b>PayPal Email:</b> {formData.paypalEmail}</p>
        )}
        {formData.paymentMethod === "GooglePay" && (
          <p><b>GPay Number:</b> {formData.gpayNumber}</p>
        )}
        {formData.paymentMethod === "BankTransfer" && (
          <>
            <p><b>Bank Name:</b> {formData.bankName}</p>
            <p><b>Account No:</b> {formData.accountNumber}</p>
            <p><b>IFSC/SWIFT:</b> {formData.ifsc}</p>
          </>
        )}
        {formData.paymentMethod === "UPI" && <p><b>UPI ID:</b> {formData.upiId}</p>}
        {formData.paymentMethod === "Other" && <p><b>Other:</b> {formData.otherPayment}</p>}
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
          onClick={handleConfirm}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
};

export default HostStep6;
