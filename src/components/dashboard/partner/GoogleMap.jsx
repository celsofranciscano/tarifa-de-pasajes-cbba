'use client'
import React from 'react';

const GoogleMap = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es&z=14&output=embed`;

  return (
    <div className='bg-white rounded-md p-4 shadow-md py-6'>
      <h1 className='text-2xl font-medium pb-4'>
        Ubicación en Google Maps
      </h1>
    
      <iframe
      className='rounded-md'
        width="100%"
        height="400px"
        src={mapUrl}
        title="Google Maps"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMap;
