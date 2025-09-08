import React from 'react';

const WeddingCard = ({ wedding }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <h2 className="text-xl font-semibold">{wedding.names}</h2>
    <p className="text-gray-600">{wedding.location}</p>
    <p className="text-gray-600">{wedding.date}</p>
  </div>
);

export default WeddingCard;
