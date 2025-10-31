import React from 'react';
import { MapPin, Calendar, Heart, Users } from 'lucide-react';

const WeddingCard = ({ wedding, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-pink-200 to-purple-200">
        {wedding.image ? (
          <img 
            src={wedding.image} 
            alt={`${wedding.brideFirst} & ${wedding.groomFirst}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-pink-400" />
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <p className="text-xs text-gray-600 font-semibold">
            {formatDate(wedding.date)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Names */}
        <h3 className="text-2xl font-serif text-gray-800 mb-2">
          {wedding.brideFirst} & {wedding.groomFirst}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {wedding.city}, {wedding.country}
          </span>
        </div>

        {/* Story Preview */}
        {wedding.story && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {wedding.story}
          </p>
        )}

        {/* Details */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{wedding.days || '1'} Day{wedding.days > 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{wedding.food || 'Food Provided'}</span>
          </div>
        </div>

        {/* Languages */}
        {wedding.languages && Array.isArray(wedding.languages) && wedding.languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {wedding.languages.slice(0, 3).map((lang, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        )}

        {/* View Details Button */}
        <button className="w-full mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default WeddingCard;