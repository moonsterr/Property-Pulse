'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');

  const router = useRouter();

  function handleSubmit() {
    if (location === '' && type === 'all') {
      router.push('/properties');
    } else {
      const query = `?location=${location}&type=${type}`;
      router.push(`/properties/search-results${query}`);
    }
  }
  return (
    <form action={handleSubmit} className="hero-form">
      <div className="form-input location-input">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Keywords or Location (City, State, Zip, etc)"
          className="input-field"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-input property-type-input">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          id="property-type"
          className="input-field"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
