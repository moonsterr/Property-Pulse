import React from 'react';
import { FaShare } from 'react-icons/fa6';

const ShareButton = () => {
  return (
    <button className="property-sidebar-btn property-share-btn">
      <FaShare className="property-sidebar-btn-icon" /> Share Property
    </button>
  );
};

export default ShareButton;
