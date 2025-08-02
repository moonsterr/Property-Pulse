import React from 'react';
import SearchForm from './SearchForm';
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
        <SearchForm />
      </div>
    </section>
  );
};

export default Hero;
