import React from 'react';
import PropertyEditForm from '@/components/PropertyEditForm';
const PropertyEditPage = () => {
  return (
    <section className="add-property-section">
      <div className="add-property-container">
        <div className="add-property-card">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyEditPage;
