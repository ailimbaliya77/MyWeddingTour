import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const WeddingDetails = () => {
  const { id } = useParams();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRSVP, setShowRSVP] = useState(false);
  const [guestData, setGuestData] = useState({
    guestName: "",
    guestEmail: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch wedding details
  useEffect(() => {
    const fetchWedding = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/wedding/${id}`);
        const data = await res.json();
        if (res.ok) setWedding(data.wedding || data);
        else console.error("Failed to fetch wedding:", data);
      } catch (error) {
        console.error("Error fetching wedding:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWedding();
  }, [id]);

  // Handle RSVP form input
  const handleRSVPChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  // Submit RSVP form
  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(" backend API", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: id,
          ...guestData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 RSVP submitted successfully!");
        setGuestData({ guestName: "", guestEmail: "", message: "" });
        setShowRSVP(false);
      } else {
        alert("❌ Error: " + (data.message || "Failed to submit RSVP"));
      }
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg">Loading wedding details...</p>
      </div>
    );

  if (!wedding)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-600">Wedding not found 😔</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={wedding.coverImage || "/placeholder.jpg"}
          alt="Wedding cover"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold mb-2">
            {wedding.brideFirst} & {wedding.groomFirst}
          </h1>
          <p className="text-lg">
            {new Date(wedding.date).toLocaleDateString()} • {wedding.location}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-5">
        <Link to="/weddings" className="text-pink-600 hover:underline text-sm font-medium">
          ← Back to Weddings
        </Link>

        <h2 className="text-3xl font-semibold text-gray-800 mt-5 mb-4">
          About the Wedding
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          {wedding.description || "This couple is excited to celebrate their special day!"}
        </p>

        <div className="grid md:grid-cols-2 gap-6 bg-white shadow-md rounded-2xl p-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">👰 Bride</h3>
            <p className="text-gray-700">
              {wedding.brideFirst} {wedding.brideLast}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🤵 Groom</h3>
            <p className="text-gray-700">
              {wedding.groomFirst} {wedding.groomLast}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📅 Date</h3>
            <p className="text-gray-700">
              {new Date(wedding.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📍 Location</h3>
            <p className="text-gray-700">{wedding.location}</p>
          </div>
        </div>

        {/* Host Section */}
        <div className="mt-10 bg-teal-50 border border-teal-100 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-teal-700 mb-3">About the Hosts</h3>
          <p className="text-gray-700">
            Hosted by{" "}
            <span className="font-semibold">
              {wedding.brideFirst} & {wedding.groomFirst}
            </span>. Contact at{" "}
            <span className="text-teal-600 font-semibold">{wedding.email}</span>.
          </p>
        </div>

        {/* RSVP Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowRSVP(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-3 rounded-full shadow-md transition-all"
          >
            RSVP to this Wedding
          </button>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] md:w-[500px] relative">
            <button
              onClick={() => setShowRSVP(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
              RSVP to {wedding.brideFirst} & {wedding.groomFirst}'s Wedding
            </h3>

            <form onSubmit={handleRSVPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={guestData.guestName}
                  onChange={handleRSVPChange}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="guestEmail"
                  value={guestData.guestEmail}
                  onChange={handleRSVPChange}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  value={guestData.message}
                  onChange={handleRSVPChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
              >
                {submitting ? "Submitting..." : "Submit RSVP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingDetails;
