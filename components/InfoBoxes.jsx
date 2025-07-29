import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section className="role-section">
      <div className="container">
        <div className="grid-container">
          <InfoBox
            heading={'For Renters'}
            text={
              'Find your dream rental property. Bookmark properties and contact owners.'
            }
            buttonInfo={'Browse Properties'}
            forWho={'renters'}
            path={'/properties'}
          />
          <InfoBox
            heading={'For Property Owners'}
            text={
              'List your properties and reach potential tenants. Rent as an Airbnb or long term'
            }
            buttonInfo={' Add Property'}
            forWho={'owners'}
            path={'/properties/add'}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
