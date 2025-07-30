'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status !== 200) {
        return toast.error('something went wrong');
      }
      const data = await res.json();
      toast.success(data.message);
      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };
  return (
    <button
      onClick={handleClick}
      className="property-sidebar-btn property-bookmark-btn"
    >
      <FaBookmark className="property-sidebar-btn-icon" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
