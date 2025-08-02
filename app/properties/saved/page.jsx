'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks');

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch saved properties');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch saved properties');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="saved-properties-section">
      <div className="saved-properties-container">
        <h1 className="saved-properties-title">Saved Properties</h1>
        {properties.length === 0 ? (
          <p className="saved-properties-empty">No saved properties</p>
        ) : (
          <div className="saved-properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
