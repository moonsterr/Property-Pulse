import React from 'react';
import PropertyAddForm from '@/components/PropertyAddForm';
const PropertyAddPage = () => {
  return (
    <section className="add-property-section">
      <div className="add-property-container">
        <div className="add-property-card">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;
