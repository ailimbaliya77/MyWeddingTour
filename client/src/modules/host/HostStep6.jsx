/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Calendar, Mail, Phone, Video, CheckCircle,
  MapPin, Utensils, User
} from 'lucide-react';

export default function HostStep6({ formData, setFormData }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ------------------------------
  // Helper: Convert image to preview URL
  // ------------------------------
  const getImageUrl = () => {
    if (!formData?.couplePhoto) return null;
    if (typeof formData.couplePhoto === "string") return formData.couplePhoto;
    try {
      return URL.createObjectURL(formData.couplePhoto);
    } catch (e) {
      return null;
    }
  };

  // ------------------------------
  // Helper: Format Event address
  // ------------------------------
  const formatAddress = (loc) => {
    if (!loc) return "";
    const parts = [
      loc.houseNumber,
      loc.street,
      loc.city,
      loc.region,
      loc.postalCode,
      loc.country
    ].filter(Boolean);
    return parts.join(", ");
  };

  // ------------------------------
  // ✅ SUBMIT TO BACKEND (Option A)
  // ------------------------------
  const handleSubmit = async () => {
  try {
    // IMPORTANT:
    // Your backend saves data in Step-1 to Step-4.
    // There is NO Step-6 API in backend.
    // So Step-6 does NOT send any data.

    navigate("/weddings");
  } catch (error) {
    console.error(error);
  }
};


  const goBack = () => navigate("/weddings/register/step5");
  const imageUrl = getImageUrl();

  // ============================
  // RENDER UI (unchanged)
  // ============================

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 rounded-full mb-4 shadow-md">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Review & Submit</h1>
          <p className="text-sm text-gray-600">Check all details below — you can go back to edit.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Cover image */}
          {imageUrl && (
            <div className="h-64 md:h-80 w-full relative overflow-hidden">
              <img src={imageUrl} alt="cover" className="w-full h-full object-cover" />
              <div className="absolute left-6 bottom-6 text-white">
                <h2 className="text-2xl font-bold">
                  {formData?.bride?.firstName} & {formData?.groom?.firstName}
                </h2>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formData?.events?.[0]?.startDate || "Date not set"}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">

            {/* Couple Section */}
            <section className="grid md:grid-cols-2 gap-4">
              {/* Bride */}
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-gray-500">Bride</p>
                <p className="text-lg font-semibold">
                  {formData?.bride?.firstName} {formData?.bride?.lastName}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4" />
                  {formData?.bride?.email || "—"}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {formData?.bride?.phone || "—"}
                </p>
              </div>

              {/* Groom */}
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-gray-500">Groom</p>
                <p className="text-lg font-semibold">
                  {formData?.groom?.firstName} {formData?.groom?.lastName}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4" />
                  {formData?.groom?.email || "—"}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {formData?.groom?.phone || "—"}
                </p>
              </div>
            </section>

            {/* Story */}
            {formData?.storyDescription && (
              <section className="p-4 border rounded-lg">
                <h3 className="font-semibold">Our Love Story</h3>
                <p className="text-gray-700 mt-2">{formData.storyDescription}</p>
              </section>
            )}

            {/* Events */}
            {formData?.events?.length > 0 && (
              <section>
                <h3 className="font-semibold mb-3">Events</h3>
                <div className="space-y-3">
                  {formData.events.map((ev, i) => (
                    <div key={i} className="p-4 border rounded-lg">

                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{ev.eventName || `Event ${i + 1}`}</p>
                          <p className="text-sm text-gray-500">Day {ev.day}</p>
                          {ev.ritualName && <p className="text-sm text-gray-500">Ritual: {ev.ritualName}</p>}
                        </div>

                        <div className="text-sm text-gray-500">
                          {ev.startDate} {ev.startTime && `• ${ev.startTime}`}
                        </div>
                      </div>

                      {ev.description && <p className="mt-2 text-gray-700">{ev.description}</p>}

                      <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-gray-700">
                        {ev.venueName && <div className="flex items-start gap-2"><MapPin className="w-4" /> {ev.venueName}</div>}
                        {ev.location && <div className="flex items-start gap-2"><MapPin className="w-4" /> {formatAddress(ev.location)}</div>}
                        {ev.foodType && <div className="flex items-start gap-2"><Utensils className="w-4" /> {ev.foodType}</div>}
                        {ev.dressCode && <div className="flex items-start gap-2"><User className="w-4" /> {ev.dressCode}</div>}
                      </div>

                      {ev.extraNotes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-500">Additional notes</p>
                          <p className="text-gray-700 mt-1">{ev.extraNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Guide */}
            {formData?.guideFirstName && (
              <section className="p-4 border rounded-lg">
                <h3 className="font-semibold">Ceremony Guide</h3>
                <p className="text-gray-800 mt-1">
                  {formData.guideFirstName} {formData.guideLastName}
                </p>
                <div className="text-sm text-gray-600 mt-2 grid md:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2"><Mail className="w-4" />{formData.guideEmail}</div>
                  <div className="flex items-center gap-2"><Phone className="w-4" />{formData.guidePhoneNumber}</div>
                  <div className="flex items-center gap-2">
                    {(formData.guideLanguages || []).filter(Boolean).join(", ")}
                  </div>
                </div>
              </section>
            )}

            {/* Payment */}
            {formData?.paymentMethod && (
              <section className="p-4 border rounded-lg">
                <h3 className="font-semibold">Payment</h3>
                <p className="text-gray-700 mt-1">
                  Method: {formData.paymentMethod}
                </p>
              </section>
            )}

            {/* Video */}
            {formData.youtube && (
              <section className="p-4 border rounded-lg">
                <h3 className="font-semibold">Video</h3>
                <a
                  href={formData.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  <Video className="inline-block w-4 h-4 mr-2" />
                  {formData.youtube}
                </a>
              </section>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={goBack}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border rounded-lg"
              >
                Back to edit
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit and publish
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
