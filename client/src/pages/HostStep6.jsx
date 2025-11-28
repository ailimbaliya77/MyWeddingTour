import React from "react";
import { useNavigate } from "react-router-dom";

export default function HostStep6({ formData }) {
  const navigate = useNavigate();

  // Redirect user to final weddings page and save data
  const handleSubmitWedding = () => {
    localStorage.setItem("finalWeddingData", JSON.stringify(formData));
    navigate("/weddings"); // Final redirect
  };

  const goTo = (step) => navigate(`/weddings/register/step${step}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">Review your wedding details</h1>
        <p className="text-gray-600 mb-10">Step 6 • Summary</p>

        {/* ──────────────────────────────
            COUPLE DETAILS
        ────────────────────────────── */}
        <section className="mb-10 border rounded-xl p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Couple Details</h2>
            <button className="text-teal-600 hover:underline" onClick={() => goTo(1)}>
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">Bride</p>
              <p className="font-medium">{formData?.bride?.firstName} {formData?.bride?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">Groom</p>
              <p className="font-medium">{formData?.groom?.firstName} {formData?.groom?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{formData?.bride?.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{formData?.bride?.phone}</p>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────
            LOVE STORY + IMAGE
        ────────────────────────────── */}
        <section className="mb-10 border rounded-xl p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Story & Photo</h2>
            <button className="text-teal-600 hover:underline" onClick={() => goTo(2)}>
              Edit
            </button>
          </div>

          {formData.couplePhoto && (
            <img
              src={URL.createObjectURL(formData.couplePhoto)}
              alt="Couple"
              className="w-full rounded-xl mb-6 shadow-md"
            />
          )}

          <p className="text-gray-500 mb-1 font-semibold">Love Story</p>
          <p className="text-gray-800 whitespace-pre-line">
            {formData.storyDescription}
          </p>

          {formData.youtube && (
            <div className="mt-4">
              <p className="font-semibold text-gray-600 mb-1">YouTube Video:</p>
              <a href={formData.youtube} target="_blank" className="text-blue-600 underline">
                {formData.youtube}
              </a>
            </div>
          )}
        </section>

        {/* ──────────────────────────────
            WEDDING EVENTS
        ────────────────────────────── */}
        <section className="mb-10 border rounded-xl p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Wedding Events</h2>
            <button className="text-teal-600 hover:underline" onClick={() => goTo(3)}>
              Edit
            </button>
          </div>

          {formData.events?.map((ev, i) => (
            <div key={i} className="border-b last:border-none pb-6 mb-6">
              <h3 className="font-semibold text-lg text-teal-700">
                Day {ev.day}: {ev.eventName}
              </h3>

              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Date:</span> {ev.startDate}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Time:</span> {ev.startTime}
              </p>

              <p className="text-gray-700 mt-3 whitespace-pre-line">
                {ev.description}
              </p>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Food Type:</span> {ev.foodType}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Music:</span>{" "}
                {ev.musicAvailable ? "Yes" : "No"}
              </p>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Venue:</span> {ev.venueName}
              </p>

              <div className="mt-3">
                <p className="font-semibold text-gray-600">Location:</p>
                <p className="text-gray-700">
                  {ev.location.street} {ev.location.houseNumber}, {ev.location.city},{" "}
                  {ev.location.region}, {ev.location.country} - {ev.location.postalCode}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ──────────────────────────────
            WEDDING DETAILS (Step 4 & 5)
            You can add more fields later
        ────────────────────────────── */}
        <section className="mb-10 border rounded-xl p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Wedding Details</h2>
            <button className="text-teal-600 hover:underline" onClick={() => goTo(4)}>
              Edit
            </button>
          </div>

          <p className="text-gray-700">
            <span className="font-semibold">Guest Limit:</span> {formData.guestLimit || "Not provided"}
          </p>

          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Ticket Price:</span> {formData.ticketPrice || "Not provided"}
          </p>
        </section>

        {/* ──────────────────────────────
            SUBMIT BUTTON
        ────────────────────────────── */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitWedding}
            className="px-10 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition transform hover:scale-105 active:scale-95"
          >
            Submit Wedding →
          </button>
        </div>
      </div>
    </div>
  );
}
