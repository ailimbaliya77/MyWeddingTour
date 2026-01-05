import React from "react";
import { Link } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";

function TestimonialCard({ image, name, location, quote, ctaText, ctaLink }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-100 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-red-200"
        />
        <div className="ml-4">
          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          <p className="text-gray-600 text-sm">{location}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} className="text-yellow-400 text-sm" />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 flex-grow italic">"{quote}"</p>
      
      {ctaText && ctaLink && (
        <Link 
          to={ctaLink}
          className="mt-auto inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 text-sm border-t border-gray-100 pt-4"
        >
          {ctaText} →
        </Link>
      )}
    </div>
  );
}

export default TestimonialCard;