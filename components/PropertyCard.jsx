import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaLocationDot,
} from 'react-icons/fa6';

const PropertyCard = ({ property }) => {
  const getRatesDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="property-card">
      <Image
        src={`${property.images[0]}`}
        alt=""
        className="property-image"
        sizes="100vw"
        height={0}
        width={0}
      />
      <div className="property-content">
        <div className="property-header">
          <div className="property-type">{property.type}</div>
          <h3 className="property-title">{property.name}</h3>
        </div>

        <h3 className="property-price">${getRatesDisplay()}</h3>

        <div className="property-info">
          <p>
            <FaBed className="icon" /> {property.beds}
            <span className="optional-label"> Beds</span>
          </p>
          <p>
            <FaBath className="icon" /> {property.baths}
            <span className="optional-label"> Baths</span>
          </p>
          <p>
            <FaRulerCombined className="icon" /> {property.square_feet}
            <span className="optional-label"> sqft</span>
          </p>
        </div>

        <div className="property-rates">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="icon rate-icon" /> Nightly
            </p>
          )}

          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="icon rate-icon" /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="icon rate-icon" /> Monthly
            </p>
          )}
        </div>

        <div className="divider"></div>

        <div className="property-footer">
          <div className="property-location">
            <FaLocationDot className="icon" />
            <span>
              {' '}
              {property.location.city} {property.location.state}{' '}
            </span>
          </div>
          <Link href={`/properties/${property._id}`} className="property-link">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
