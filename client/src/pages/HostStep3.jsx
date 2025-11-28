import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostStep3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const [numDays, setNumDays] = useState(formData.days || 1);

  const [events, setEvents] = useState(
    formData.events || [
      {
        day: 1,
        eventName: "",
        description: "",
        ritualName: "",
        foodType: "",
        musicAvailable: false,
        dressCode: "",
        venueName: "",
        extraNotes: "",
        specialPerformance: "",
        startDate: "",
        startTime: "",
        location: {
          country: "",
          region: "",
          city: "",
          postalCode: "",
          street: "",
          houseNumber: "",
        },
      },
    ]
  );

  // Days change
  const handleDaysChange = (e) => {
    setNumDays(parseInt(e.target.value));
  };

  // Add event
  const addEvent = (dayNumber) => {
    const newEvent = {
      day: dayNumber,
      eventName: "",
      description: "",
      ritualName: "",
      foodType: "",
      musicAvailable: false,
      dressCode: "",
      venueName: "",
      extraNotes: "",
      specialPerformance: "",
      startDate: "",
      startTime: "",
      location: {
        country: "",
        region: "",
        city: "",
        postalCode: "",
        street: "",
        houseNumber: "",
      },
    };
    setEvents([...events, newEvent]);
  };

  // Update event
  const updateEvent = (index, key, value) => {
    const updated = [...events];
    updated[index][key] = value;
    setEvents(updated);
  };

  // Update location
  const updateLocation = (index, key, value) => {
    const updated = [...events];
    updated[index].location[key] = value;
    setEvents(updated);
  };

  const handleNext = async () => {
    navigate("/weddings/register/step4");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-8 bg-white shadow-xl rounded-2xl">

      {/* Header */}
      <h2 className="text-2xl font-bold text-black-800 mb-1">
        Hi {formData.bride?.firstName || "Host"}, let's plan your wedding events
      </h2>
      <p className="text-sm text-black-500 mb-8">
        STEP 3 • Share important details about your wedding days & ceremonies
      </p>

      {/* Days Selector */}
      <div className="mb-8">
        <label className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-black-700 text-md mb-8 flex items-start gap-3">
          How many days will your wedding go for?
          <select
          value={numDays}
          onChange={handleDaysChange}
          className="border border-black-300 px-5 py-4 rounded-lg shadow-lg w-48"
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
          <option value={4}>4 Days</option>
          <option value={5}>5 Days</option>
        </select>
        </label>
        
      </div>

      {/* IMPORTANT MESSAGE BOX */}
      <div className="p-4 border border-teal-200 bg-teal-50 rounded-xl text-black-700 text-sm mb-8 flex items-start gap-3">
        <div className="text-teal-600 text-lg mt-1">ℹ️</div>
        <p>
          You are required to offer food and drinks (non alcoholic) at the wedding. 
          Accommodation and transportation are not included in the price the travelers pay. 
          However, you can offer these services for them after they have completed their booking.
        </p>
      </div>

      {/* Event Sections per Day */}
      {Array.from({ length: numDays }).map((_, dayIndex) => {
        const dayNumber = dayIndex + 1;

        return (
          <div
            key={dayNumber}
            className="mb-12 bg-black-50 p-6 rounded-2xl shadow-sm border border-black-200"
          >
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Day {dayNumber} — Wedding Functions
            </h3>

            {/* Events for this day */}
            {events
              .filter((ev) => ev.day === dayNumber)
              .map((ev, index) => (
                <div
                  key={index}
                  className="bg-white border border-black-200 p-6 rounded-xl shadow-sm mb-6"
                >
                  <h4 className="text-lg font-semibold text-pink-700 mb-4">
                    Events for Day {dayNumber}
                  </h4>

                  {/* Event Name */}
                  <input
                    type="text"
                    placeholder="Name of the event (e.g., Sangeet, Haldi)"
                    className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                    value={ev.eventName}
                    onChange={(e) =>
                      updateEvent(index, "eventName", e.target.value)
                    }
                  />

                  {/* DATE + TIME */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    <div>
                      <label className="block text-black-700 text-sm mb-1">
                        When does it start? *
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm"
                        value={ev.startDate || ""}
                        onChange={(e) =>
                          updateEvent(index, "startDate", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-black-700 text-sm mb-1">
                        What time does it start? *
                      </label>
                      <input
                        type="time"
                        className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm"
                        value={ev.startTime || ""}
                        onChange={(e) =>
                          updateEvent(index, "startTime", e.target.value)
                        }
                      />
                    </div>

                  </div>

                  {/* Description */}
                  <textarea
                    rows={3}
                    placeholder="Tell travelers what will happen at this event..."
                    className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                    value={ev.description}
                    onChange={(e) =>
                      updateEvent(index, "description", e.target.value)
                    }
                  ></textarea>

                  {/* Food */}
                  <input
                    type="text"
                    placeholder="Food Type (Veg / Non-Veg / Both)"
                    className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                    value={ev.foodType}
                    onChange={(e) =>
                      updateEvent(index, "foodType", e.target.value)
                    }
                  />

                  {/* Music */}
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={ev.musicAvailable}
                      onChange={(e) =>
                        updateEvent(index, "musicAvailable", e.target.checked)
                      }
                    />
                    <span className="text-black-700">Will there be music or dance?</span>
                  </label>

                  {/* Dress Code */}
                  <input
                    type="text"
                    placeholder="Dress code (optional)"
                    className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                    value={ev.dressCode}
                    onChange={(e) =>
                      updateEvent(index, "dressCode", e.target.value)
                    }
                  />

                  {/* Venue */}
                  <input
                    type="text"
                    placeholder="Venue Name"
                    className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm"
                    value={ev.venueName}
                    onChange={(e) =>
                      updateEvent(index, "venueName", e.target.value)
                    }
                  />

                  {/* Location */}
                  <h5 className="font-semibold text-black-700 mb-2 mt-4">
                    Event Location
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Country"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.country}
                      onChange={(e) =>
                        updateLocation(index, "country", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="City"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.city}
                      onChange={(e) =>
                        updateLocation(index, "city", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Region"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.region}
                      onChange={(e) =>
                        updateLocation(index, "region", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.postalCode}
                      onChange={(e) =>
                        updateLocation(index, "postalCode", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Street"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.street}
                      onChange={(e) =>
                        updateLocation(index, "street", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="House Number"
                      className="border px-3 py-2 rounded-lg shadow-sm"
                      value={ev.location.houseNumber}
                      onChange={(e) =>
                        updateLocation(index, "houseNumber", e.target.value)
                      }
                    />
                  </div>

                  {/* Extra Notes */}
                  <textarea
                    rows={3}
                    placeholder="Any important notes for guests?"
                    className="w-full px-3 py-2 border rounded-lg mt-4 shadow-sm"
                    value={ev.extraNotes}
                    onChange={(e) =>
                      updateEvent(index, "extraNotes", e.target.value)
                    }
                  ></textarea>
                </div>
              ))}

            {/* Add Function Button */}
            <button
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              onClick={() => addEvent(dayNumber)}
            >
              + Add another function
            </button>
          </div>
        );
      })}

      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default HostStep3;
