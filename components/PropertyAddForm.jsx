'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading';

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: '',
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    beds: '',
    baths: '',
    square_feet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      nightly: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    },
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFields((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = [...fields.amenities];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    setFields((prev) => ({
      ...prev,
      amenities: updatedAmenities,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const updatedImages = [...fields.images];
    for (const file of files) {
      updatedImages.push(file);
    }
    setFields((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };
  return (
    mounted && (
      <form
        action="/api/properties"
        method="POST"
        encType="multipart/form-data"
        className="add-property-form"
      >
        <h2>Add New Property</h2>
        <div className="form-group">
          <label htmlFor="type" className="form-label">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            className="form-select"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="CabinOrCottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <label htmlFor="title">Property Title</label>
        <input
          type="text"
          id="title"
          name="name"
          placeholder="e.g. Modern Apartment"
          value={fields.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Enter a detailed description..."
          value={fields.description}
          onChange={handleChange}
        ></textarea>

        <div className="property-location">
          <label htmlFor="address">street</label>
          <input
            type="text"
            id="address"
            name="location.street"
            value={fields.location.street}
            onChange={handleChange}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="location.city"
            value={fields.location.city}
            onChange={handleChange}
          />
          <label htmlFor="city">State</label>
          <input
            type="text"
            id="state"
            name="location.state"
            value={fields.location.state}
            onChange={handleChange}
          />

          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            value={fields.location.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className="property-room-details">
          <div>
            <label htmlFor="bedrooms">Bedrooms</label>
            <input
              type="number"
              id="bedrooms"
              name="beds"
              value={fields.beds}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bathrooms">Bathrooms</label>
            <input
              type="number"
              id="bathrooms"
              name="baths"
              value={fields.baths}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="size">Size (sqft)</label>
            <input
              type="number"
              id="size"
              name="square_feet"
              value={fields.square_feet}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="amenities-grid">
          {[
            { id: 'wifi', label: 'Wifi' },
            { id: 'kitchen', label: 'Full Kitchen' },
            { id: 'washer_dryer', label: 'Washer & Dryer' },
            { id: 'free_parking', label: 'Free Parking' },
            { id: 'pool', label: 'Swimming Pool' },
            { id: 'hot_tub', label: 'Hot Tub' },
            { id: 'security', label: '24/7 Security' },
            { id: 'wheelchair', label: 'Wheelchair Accessible' },
            { id: 'elevator', label: 'Elevator Access' },
            { id: 'dishwasher', label: 'Dishwasher' },
            { id: 'gym', label: 'Gym/Fitness Center' },
            { id: 'ac', label: 'Air Conditioning' },
            { id: 'balcony', label: 'Balcony/Patio' },
            { id: 'smart_tv', label: 'Smart TV' },
            { id: 'coffee', label: 'Coffee Maker' },
          ].map(({ id, label }) => (
            <div key={id} className="amenity-item">
              <input
                type="checkbox"
                id={`amenity_${id}`}
                name="amenities"
                value={label}
                className="mr-2"
                checked={fields.amenities.includes(label)}
                onChange={handleAmenitiesChange}
              />
              <label
                key={id}
                htmlFor={`amenity_${id}`}
                className="amenity-item"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
        <div className="rates">
          <h3>Rates (Leave Blank if not applicable)</h3>
          <div className="rates-details">
            <div className="">
              <label htmlFor="nightly">Nightly</label>
              <input
                type="number"
                id="nightl"
                name="rates.nightly"
                value={fields.rates.nightly}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="weekly">Weekly</label>
              <input
                type="number"
                id="weekly"
                name="rates.weekly"
                value={fields.rates.weekly}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="monthly">Monthly</label>
              <input
                type="number"
                id="monthly"
                name="rates.monthly"
                value={fields.rates.monthly}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="seller-info">
          <div className="">
            <label htmlFor="seller-name">Seller Name</label>
            <input
              type="text"
              name="seller_info.name"
              id="seller_info.seller-name"
              value={fields.seller_info.name}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="seller-email">Seller Email</label>
            <input
              type="text"
              name="seller_info.email"
              id="seller_info.seller-email"
              value={fields.seller_info.email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="seller-phone">Seller Phone</label>
            <input
              type="text"
              name="seller_info.phone"
              id="seller-phone"
              value={fields.seller_info.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="images" className="form-label">
            Images (Select up to 4 images)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="form-input-img"
            accept="image/*"
            multiple
            required
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Submit Property</button>
      </form>
    )
  );
};

export default PropertyAddForm;
