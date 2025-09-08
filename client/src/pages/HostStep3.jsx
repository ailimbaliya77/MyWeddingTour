import React from "react";
import { useNavigate } from "react-router-dom";

const HostStep3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [
        ...(prev.events || []),
        { name: "", description: "", music: "yes", dressCode: "" },
      ],
    }));
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...(formData.events || [])];
    updatedEvents[index][field] = value;
    setFormData((prev) => ({ ...prev, events: updatedEvents }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/weddings/register/step4");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
      {/* Step Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        HI {formData.brideFirst || "HOST"}, LET’S GET YOU READY TO BECOME A HOST
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-bold text-slate-600">STEP 3</span> Share your wedding details
      </p>

      {/* Wedding Duration */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How many days will your wedding go for? <span className="text-red-500">*</span>
        </label>
        <select
          name="days"
          value={formData.days || ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Choose days</option>
          <option value="1">1 Day</option>
          <option value="2">2 Days</option>
          <option value="3">3 Days</option>
          <option value="more">More than 3 Days</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          You are required to offer food and drinks (non-alcoholic) at the wedding. 
          Accommodation and transport are not included in the price to traveling guests. 
          However, you can offer these services for free after they have completed their booking.
        </p>
      </div>

      {/* Food Option */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What kind of food will be offered? <span className="text-red-500">*</span>
        </label>
        <select
          name="food"
          value={formData.food || ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
          <option value="both">Both</option>
        </select>
      </div>

      {/* Alcohol Option */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Will alcohol be offered at the event?
        </label>
        <select
          name="alcohol"
          value={formData.alcohol || ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {/* Language Option */}
      <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Main language(s) of the wedding <span className="text-red-500">*</span>
  </label>

  {(formData.languages || [""]).map((lang, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={lang}
        onChange={(e) => {
          const updated = [...(formData.languages || [])];
          updated[index] = e.target.value;
          setFormData({ ...formData, languages: updated });
        }}
        placeholder="e.g. English"
        className="w-full border rounded-lg px-3 py-2"
      />
      <button
        type="button"
        onClick={() => {
          const updated = [...(formData.languages || [])];
          updated.splice(index, 1);
          setFormData({ ...formData, languages: updated });
        }}
        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setFormData({
        ...formData,
        languages: [...(formData.languages || []), ""],
      })
    }
    className="mt-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
  >
    + Add another language
  </button>
</div>


      {/* Wedding Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            When does it start? <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What time does it start?
          </label>
          <input
            type="time"
            name="time"
            value={formData.time || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            placeholder="Please choose"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region (optional)</label>
          <input
            type="text"
            name="region"
            value={formData.region || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
          <input
            type="text"
            name="postal"
            value={formData.postal || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Venue name</label>
        <input
          type="text"
          name="venue"
          value={formData.venue || ""}
          onChange={handleChange}
          placeholder="Optional"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Event Details */}
      {(formData.events || [{ name: "", description: "", music: "yes", dressCode: "" }]).map(
        (event, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 mb-6">
            <h3 className="text-lg font-semibold mb-4">Event {index + 1}</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of the event/ceremony
              </label>
              <input
                type="text"
                value={event.name}
                onChange={(e) => handleEventChange(index, "name", e.target.value)}
                placeholder="e.g. Sangeet"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What happens at this event?
              </label>
              <textarea
                value={event.description}
                onChange={(e) => handleEventChange(index, "description", e.target.value)}
                rows="3"
                placeholder="Tell us what happens at this event..."
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Will there be music and/or dancing at this event?
              </label>
              <select
                value={event.music}
                onChange={(e) => handleEventChange(index, "music", e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is the dress code at this event?
              </label>
              <input
                type="text"
                value={event.dressCode}
                onChange={(e) => handleEventChange(index, "dressCode", e.target.value)}
                placeholder="e.g. Traditional Indian"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        )
      )}

      {/* Add Event Button */}
      <button
        type="button"
        onClick={addEvent}
        className="mb-6 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
      >
        + Add another function to this day
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default HostStep3;
