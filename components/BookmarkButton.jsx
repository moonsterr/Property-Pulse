import React from 'react';
import { FaBookmark } from 'react-icons/fa6';
const BookmarkButton = ({ property }) => {
  return (
    <button className="property-sidebar-btn property-bookmark-btn">
      <FaBookmark className="property-sidebar-btn-icon" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
