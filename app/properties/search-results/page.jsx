'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import SearchForm from '@/components/SearchForm';
import Properties from '@/components/Properties';

const SearchResultsPage = () => {
  return (
    <>
      <section className="search-header">
        <div className="search-header-container">
          <SearchForm />
        </div>
      </section>

      <Properties />
    </>
  );
};
export default SearchResultsPage;
