'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading';
import { fetchProperty } from '@/utils/requests';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import sanitizeObject from '@/utils/sanitization';

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    type: 'Apartment',
    name: 'Test Property',
    description: '',
    location: {
      street: '',
      city: 'Test City',
      state: 'Test State',
      zipcode: '',
    },
    beds: '3',
    baths: '2',
    square_feet: '1800',
    amenities: ['Wifi'],
    rates: {
      weekly: '',
      monthly: '2000',
      nightly: '',
    },
    seller_info: {
      name: '',
      email: 'test@gmail.com',
      phone: '',
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);
        const sanitizedData = sanitizeObject(propertyData);

        setFields(sanitizedData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('did it work');
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData,
      });
      console.log(res.status, 11111);
      if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      }
    } catch (error) {
      toast.error('Failed to Update');
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit} className="add-property-form">
        <h2>Edit Property</h2>
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
          ].map(({ id, label }, index) => (
            <div key={index} className="amenity-item">
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

        <button type="submit">Submit Property</button>
      </form>
    )
  );
};

export default PropertyEditForm;
