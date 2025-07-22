import React from 'react';

const InfoBoxes = () => {
  return (
    <section className="role-section">
      <div className="container">
        <div className="grid-container">
          {/* For Renters */}
          <div className="card card-renters">
            <h2 className="card-title">For Renters</h2>
            <p className="card-text">
              Find your dream rental property. Bookmark properties and contact
              owners.
            </p>
            <a href="/properties.html" className="button button-black">
              Browse Properties
            </a>
          </div>

          {/* For Property Owners */}
          <div className="card card-owners">
            <h2 className="card-title">For Property Owners</h2>
            <p className="card-text">
              List your properties and reach potential tenants. Rent as an
              Airbnb or long term.
            </p>
            <a href="/add-property.html" className="button button-blue">
              Add Property
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
