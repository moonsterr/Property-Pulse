import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchProperties } from '@/utils/requests';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const PropertiesPage = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || '1', 10);
  const size = parseInt(searchParams.size || '3', 10);
  const { properties } = await fetchProperties(page, size);
  if (properties) {
    properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (!properties) {
    return <Spinner />;
  }
  return (
    <section className="properties-section">
      <div className="container">
        {properties.length === 0 ? (
          <p>no properties found</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <div className="pagination-btns">
          <Link
            href={`?page=${page - 1}&size=${size}`}
            className="pagination-btn"
            scroll={false}
          >
            <FaArrowLeft />
          </Link>
          <Link
            href={`?page=${page + 1}&size=${size}`}
            className="pagination-btn"
            scroll={false}
          >
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default PropertiesPage;
