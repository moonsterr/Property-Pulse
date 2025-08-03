'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import PropertyCard from './PropertyCard';
const Properties = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('type');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&type=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(eror);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="search-results">
      <div className="search-results-container">
        <Link href="/properties" className="back-link">
          <FaArrowAltCircleLeft className="back-icon" /> Back To Properties
        </Link>
        <h1 className="results-title">Search Results</h1>
        {properties.length === 0 ? (
          <p>No search results found</p>
        ) : (
          <div className="results-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
