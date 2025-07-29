'use client';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        console.log('this is the res.results', res.results);

        //  Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div style={{ fontSize: '1.2rem' }}>No location data found</div>;
  }
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}&q=${lat},${lng}&zoom=15`;

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Property Location"
      />
    </div>
  );
};

export default PropertyMap;
