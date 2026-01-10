import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Heart, Gift, CheckCircle, DollarSign, Utensils, Wine, Music, Shirt, Phone, Mail, Languages, MapPinned } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

export default function WeddingDetails() {
   const { weddingId } = useParams();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWedding = async () => {
      try {
        const res = await fetch(
          `${API_URL}/wedding/${weddingId}`
        );
        const data = await res.json();

        if (res.ok) {
          setWedding(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch wedding", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWedding();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-gray-600 text-lg mt-4">Loading wedding details...</p>
        </div>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-red-500 text-xl">Wedding not found</p>
        </div>
      </div>
    );
  }

  const isWeddingCompleted = wedding.weddingEndDate ? new Date(wedding.weddingEndDate) < new Date() : false;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO SECTION WITH STATUS ================= */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side - Image */}
            <div className="lg:w-2/3">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={wedding.listingPhotoURL}
                  alt="Wedding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <Heart className="w-10 h-10 mb-4 animate-pulse" />
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
                    {wedding.bride?.firstName} & {wedding.groom?.firstName}
                  </h1>
                  {(wedding.bride?.lastName || wedding.groom?.lastName) && (
                    <p className="text-xl text-white/90 mb-4">
                      {wedding.bride?.lastName} - {wedding.groom?.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Status Card */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 h-full flex flex-col">
                
                {isWeddingCompleted ? (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                      Wedding Celebrated
                    </h2>
                    
                    <p className="text-gray-600 text-center mb-6">
                      {wedding.bride?.firstName} & {wedding.groom?.firstName} have already celebrated their wedding
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      {wedding.weddingStartDate && (
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-500">Wedding Date</p>
                            <p className="font-semibold text-gray-800">{formatDate(wedding.weddingStartDate)}</p>
                          </div>
                        </div>
                      )}
                      {wedding.weddingEndDate && wedding.weddingStartDate !== wedding.weddingEndDate && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="font-semibold text-gray-800">{formatDate(wedding.weddingEndDate)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                      <p className="text-sm text-gray-500">
                        Thank you for your interest
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Join Our Celebration
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      {wedding.weddingStartDate && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-rose-500" />
                          <div>
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="font-semibold text-gray-800">{formatDate(wedding.weddingStartDate)}</p>
                          </div>
                        </div>
                      )}
                      
                      {wedding.weddingEndDate && wedding.weddingStartDate !== wedding.weddingEndDate && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-rose-500" />
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="font-semibold text-gray-800">{formatDate(wedding.weddingEndDate)}</p>
                          </div>
                        </div>
                      )}

                      {wedding.totalWeddingDays && (
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-rose-500" />
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-semibold text-gray-800">{wedding.totalWeddingDays} Days</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {wedding.pricePerPerson && (
                      <div className="bg-rose-50 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Contribution</span>
                          <DollarSign className="w-5 h-5 text-rose-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">
                          ${wedding.pricePerPerson}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">per person</p>
                      </div>
                    )}

                    <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl">
                      RSVP Now
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Your presence means the world to us
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT THE HOSTS ================= */}
      {(wedding.bride || wedding.groom) && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-12">
            About the Hosts
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {wedding.bride && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                  {wedding.bride.photoURL && (
                    <img
                      src={wedding.bride.photoURL}
                      alt={wedding.bride.firstName}
                      className="w-40 h-40 rounded-full mb-6 object-cover border-4 border-rose-100 shadow-lg"
                    />
                  )}
                  <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
                    {wedding.bride.firstName} {wedding.bride.lastName}
                  </h3>
                  <p className="text-rose-500 font-medium mb-4">The Bride</p>
                  
                  {wedding.bride.bio && (
                    <p className="text-gray-600 leading-relaxed mb-4">{wedding.bride.bio}</p>
                  )}
                  
                  <div className="w-full space-y-2 text-left mt-4">
                    {wedding.bride.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-rose-500" />
                        <span>{wedding.bride.email}</span>
                      </div>
                    )}
                    {wedding.bride.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-rose-500" />
                        <span>{wedding.bride.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {wedding.groom && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                  {wedding.groom.photoURL && (
                    <img
                      src={wedding.groom.photoURL}
                      alt={wedding.groom.firstName}
                      className="w-40 h-40 rounded-full mb-6 object-cover border-4 border-rose-100 shadow-lg"
                    />
                  )}
                  <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2">
                    {wedding.groom.firstName} {wedding.groom.lastName}
                  </h3>
                  <p className="text-rose-500 font-medium mb-4">The Groom</p>
                  
                  {wedding.groom.bio && (
                    <p className="text-gray-600 leading-relaxed mb-4">{wedding.groom.bio}</p>
                  )}
                  
                  <div className="w-full space-y-2 text-left mt-4">
                    {wedding.groom.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-rose-500" />
                        <span>{wedding.groom.email}</span>
                      </div>
                    )}
                    {wedding.groom.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-rose-500" />
                        <span>{wedding.groom.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= STORY ================= */}
      {wedding.storyDescription && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6 text-center">
              Our Love Story
            </h2>
            <div className="w-20 h-1 bg-rose-500 mx-auto mb-8"></div>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {wedding.storyDescription}
            </p>
          </div>
        </section>
      )}

      {/* ================= EVENT TIMELINE ================= */}
      {wedding.events?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-4">
            Daily Itinerary
          </h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto mb-16"></div>

          <div className="space-y-8">
            {wedding.events.map((event, index) => (
              <div
                key={event._id || index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">
                      {event.day ? `Day ${event.day}` : `Day ${index + 1}`}
                    </span>
                    {event.date && (
                      <span className="text-white/90 text-sm">{formatDate(event.date)}</span>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                    {event.name}
                  </h3>

                  {event.ritualName && (
                    <p className="text-rose-500 font-medium mb-6">{event.ritualName}</p>
                  )}

                  {/* Description */}
                  {event.description && (
                    <div className="bg-rose-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {event.date && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                            <p className="font-medium text-gray-800">
                              {new Date(event.date).toLocaleString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {event.venueName && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Venue</p>
                            <p className="font-semibold text-gray-800">{event.venueName}</p>
                          </div>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-start gap-3">
                          <MapPinned className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Location</p>
                            {event.location.street && (
                              <p className="text-gray-600 text-sm">
                                {event.location.houseNumber && `${event.location.houseNumber} `}
                                {event.location.street}
                              </p>
                            )}
                            <p className="text-gray-600 text-sm">
                              {event.location.city}
                              {event.location.city && event.location.region && ", "}
                              {event.location.region}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {event.location.country}
                              {event.location.postalCode && ` - ${event.location.postalCode}`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {event.musicAvailable !== undefined && (
                        <div className="flex items-start gap-3">
                          <Music className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Music Available</p>
                            <p className="font-medium text-gray-800">
                              {event.musicAvailable ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      )}

                      {event.dressCode && (
                        <div className="flex items-start gap-3">
                          <Shirt className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Dress Code</p>
                            <p className="font-medium text-gray-800">{event.dressCode}</p>
                          </div>
                        </div>
                      )}

                      {event.foodType && (
                        <div className="flex items-start gap-3">
                          <Utensils className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Food Type</p>
                            <p className="font-medium text-gray-800">{event.foodType}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Performance & Extra Notes */}
                  {(event.specialPerformance || event.extraNotes) && (
                    <div className="border-t border-gray-100 pt-6 space-y-4">
                      {event.specialPerformance && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Special Performance</p>
                          <p className="text-gray-700">{event.specialPerformance}</p>
                        </div>
                      )}
                      {event.extraNotes && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Extra Notes</p>
                          <p className="text-gray-700">{event.extraNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= CEREMONY GUIDE ================= */}
      {wedding.ceremonyGuide && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-12">
            Your Ceremony Guide
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-rose-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {wedding.ceremonyGuide.firstName} {wedding.ceremonyGuide.lastName}
              </h3>
              {wedding.ceremonyGuide.guideCoupleRelation && (
                <p className="text-rose-500 font-medium mb-4">
                  {wedding.ceremonyGuide.guideCoupleRelation}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {wedding.ceremonyGuide.email && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{wedding.ceremonyGuide.email}</p>
                  </div>
                </div>
              )}

              {wedding.ceremonyGuide.phoneNumber && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium">{wedding.ceremonyGuide.phoneNumber}</p>
                  </div>
                </div>
              )}

              {wedding.ceremonyGuide.spokenLanguages && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Languages className="w-5 h-5 text-rose-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Spoken Languages</p>
                    <p className="text-gray-800 font-medium">
                      {Array.isArray(wedding.ceremonyGuide.spokenLanguages)
                        ? wedding.ceremonyGuide.spokenLanguages.join(", ")
                        : wedding.ceremonyGuide.spokenLanguages}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= BANK DETAILS (if needed for gifts) ================= */}
      {wedding.bankDetails && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-12">
            Gift Information
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <Gift className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <p className="text-gray-600">
                If you wish to send a monetary gift, here are the details:
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              {wedding.bankDetails.accountHolderName && (
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Account Holder:</span>
                  <span className="font-semibold text-gray-800">
                    {wedding.bankDetails.accountHolderName}
                  </span>
                </div>
              )}

              {wedding.bankDetails.accountNumber && (
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-semibold text-gray-800">
                    {wedding.bankDetails.accountNumber}
                  </span>
                </div>
              )}

              {wedding.bankDetails.ifcNumber && (
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">IFC Number:</span>
                  <span className="font-semibold text-gray-800">
                    {wedding.bankDetails.ifcNumber}
                  </span>
                </div>
              )}

              {wedding.bankDetails.linkedBankModileNumber && (
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Mobile Number:</span>
                  <span className="font-semibold text-gray-800">
                    {wedding.bankDetails.linkedBankModileNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA SECTION ================= */}
      {!isWeddingCompleted && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6">
              Celebrate With Us
            </h2>
            <p className="text-white/95 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              We would be honored to have you join us on our special day. Your presence would mean the world to us.
            </p>

            <button className="px-10 py-4 bg-white text-rose-600 font-bold rounded-full text-lg hover:bg-gray-50 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              RSVP Now
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}