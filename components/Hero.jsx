import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-text-center">
          <h1 className="hero-heading">Find The Perfect Rental</h1>
          <p className="hero-subheading">
            Discover the perfect property that suits your needs.
          </p>
        </div>

        <form className="hero-form">
          <div className="form-input location-input">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter Location (City, State, Zip, etc)"
              className="input-field"
            />
          </div>

          <div className="form-input property-type-input">
            <label htmlFor="property-type" className="sr-only">
              Property Type
            </label>
            <select id="property-type" className="input-field">
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
      </div>
    </section>
  );
};

export default Hero;
