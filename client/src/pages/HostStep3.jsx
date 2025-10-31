import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [numDays, setNumDays] = useState(formData.numDays || 1);
  const [events, setEvents] = useState(formData.events || [
    { day: 1, eventName: "", date: "", time: "", location: "", description: "" },
  ]);

  // ✅ When the number of days changes
  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value);
    setNumDays(days);

    const updatedEvents = Array.from({ length: days }, (_, i) => {
      return (
        events[i] || {
          day: i + 1,
          eventName: "",
          date: "",
          time: "",
          location: "",
          description: "",
        }
      );
    });

    setEvents(updatedEvents);
  };

  // ✅ Update event fields
  const handleEventChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  // ✅ Next button → save data + navigate
  const handleNext = async () => {
    const updatedFormData = { ...formData, numDays, events };
    setFormData(updatedFormData);

    try {
      const res = await fetch("http://localhost:3000/api/v1/wedding/step3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("✅ Step 3 saved:", data);
        navigate("/weddings/register/step4");
      } else {
        alert("❌ Failed to save Step 3 details");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving Step 3 data");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        🎊 Step 3 — Wedding Days & Events
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Specify your wedding days and add details for each day's events.
      </p>

      {/* ✅ Number of Days Selector */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          How many days does your wedding celebration last?
        </label>
        <select
          value={numDays}
          onChange={handleDaysChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-40"
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days (Maximum)</option>
        </select>
      </div>

      {/* ✅ Dynamic Event Inputs */}
      {Array.from({ length: numDays }).map((_, i) => (
        <div key={i} className="mb-10 border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-pink-700 mb-4">
            Day {i + 1} Events
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Name *
              </label>
              <input
                type="text"
                value={events[i]?.eventName}
                onChange={(e) =>
                  handleEventChange(i, "eventName", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., Mehndi Ceremony"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="date"
                value={events[i]?.date}
                onChange={(e) => handleEventChange(i, "date", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time *
              </label>
              <input
                type="time"
                value={events[i]?.time}
                onChange={(e) => handleEventChange(i, "time", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                value={events[i]?.location}
                onChange={(e) =>
                  handleEventChange(i, "location", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., Royal Palace, Jaipur"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              value={events[i]?.description}
              onChange={(e) =>
                handleEventChange(i, "description", e.target.value)
              }
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Add details about this day's events..."
            ></textarea>
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default HostStep3;
