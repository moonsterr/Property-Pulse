import React from 'react';
import {
  FaLocationDot,
  FaXmark,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
} from 'react-icons/fa6';
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="property-main-card">
        <div className="property-type-label">{property.type}</div>
        <h1 className="property-title-main">{property.name}</h1>
        <div className="property-location-row">
          <FaLocationDot className="property-location-icon" />
          <p className="property-location-text">
            {`${property.location.street} ${property.location.city}, ${property.location.state} ${property.location.zipcode}`}
          </p>
        </div>
        <h3 className="property-rates-heading">Rates & Options</h3>
        <div className="property-rates-row">
          <div className="property-rate-item">
            <div className="property-rate-label">Nightly</div>
            <div className="property-rate-value property-rate-blue">
              {property.rates.nightly ? (
                <>${property.rates.nightly}</>
              ) : (
                <FaXmark className="property-rate-x" />
              )}
            </div>
          </div>
          <div className="property-rate-item">
            <div className="property-rate-label">Weekly</div>
            <div className="property-rate-value property-rate-blue">
              {property.rates.weekly ? (
                <>${property.rates.weekly}</>
              ) : (
                <FaXmark className="property-rate-x" />
              )}
            </div>
          </div>
          <div className="property-rate-item">
            <div className="property-rate-label">Monthly</div>
            <div className="property-rate-value property-rate-blue">
              {property.rates.monthly ? (
                <>${property.rates.monthly}</>
              ) : (
                <FaXmark className="property-rate-x" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="property-main-card property-description-card">
        <h3 className="property-description-heading">Description & Details</h3>
        <div className="property-info-row">
          <p>
            <FaBed /> {property.beds}
            <span className="property-info-label">Beds</span>
          </p>
          <p>
            <FaBath /> {property.baths}
            <span className="property-info-label">Baths</span>
          </p>
          <p>
            <FaRulerCombined />
            {property.square_feet}{' '}
            <span className="property-info-label">sqft</span>
          </p>
        </div>
        <p className="property-description-text">
          {property.description || 'No description available.'}
        </p>
      </div>

      <div className="property-main-card property-amenities-card">
        <h3 className="property-description-heading">Amenities</h3>
        <ul className="property-amenities-list">
          {property.amenities.length === 0
            ? 'no amenities available'
            : property.amenities.map((amenity, idx) => (
                <li key={idx}>
                  <FaCheck className="property-amenity-icon" /> {amenity}
                </li>
              ))}
        </ul>
      </div>
      {/* Map */}
      <div className="property-main-card property-map-card">
        <div id="map">
          <PropertyMap property={property} />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
