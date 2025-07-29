import React from 'react';
import Image from 'next/image';
const PropertyHeaderImage = ({ image }) => {
  return (
    <section className="hero-image-section">
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <Image
            src={image}
            alt="Featured Property"
            className="hero-image"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
