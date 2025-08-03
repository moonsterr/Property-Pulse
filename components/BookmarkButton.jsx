'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const BookmarkButton = ({ property }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

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

      const data = await res.json();

      if (res.status !== 200) {
        return toast.error(data.message || 'Something went wrong');
      }

      setIsBookmarked(data.isBookmarked);
      toast.success(data.message || 'Bookmark status updated');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId) {
        setLoading(false); // Don't get stuck
        return;
      }

      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        const data = await res.json();

        if (res.status === 200) {
          setIsBookmarked(data.isBookmarked);
        } else {
          toast.error(data.message || 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <button
      onClick={handleClick}
      className={`property-sidebar-btn property-bookmark-btn ${
        isBookmarked ? 'bookmark-red' : ''
      }`}
    >
      <FaBookmark className="property-sidebar-btn-icon" />
      {isBookmarked ? 'Bookmarked' : 'Bookmark Property'}
    </button>
  );
};

// export const dynamic = 'force-dynamic';
export default BookmarkButton;
