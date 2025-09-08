import React from 'react'

function TestimonialCard({ name, location, image, quote }) {
    
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start gap-4">
      <div className="w-20 h-20 sm:w-16 md:w-20 lg:w-24 flex-shrink-0 mb-3 sm:mb-0">
        <img 
          src={image || "https://via.placeholder.com/100"} 
          alt={name} 
          className="w-full h-full object-cover rounded-full border-2 border-pink-200"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/100?text=Guest";
          }}
        />
      </div>
      <div className="flex-1">
        <div className="text-pink-600 text-lg sm:text-xl font-semibold mb-1">{name || "Guest Name"}</div>
        <div className="text-gray-500 text-sm mb-2 sm:mb-3">{location || "Country"}</div>
        <p className="text-gray-700 text-sm sm:text-base italic">
          {quote || "This wedding experience was truly magical. The traditions, colors, and celebrations were beyond anything I could have imagined!"}
        </p>
      </div>
    </div>
  )
}

export default TestimonialCard
