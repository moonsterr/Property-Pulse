import PropertyCard from './PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/requests.js';
import Spinner from './Spinner';

const HomeProperties = async () => {
  const properties = await fetchProperties();
  if (properties) {
    properties.sort(() => Math.random() - Math.random()).slice(0, 3);
  }
  if (!properties) return <Spinner />;
  return (
    <>
      <section className="home-properties-section">
        <div className="home-properties-container">
          <h2 className="home-properties-heading">Recent Properties</h2>
          <div className="home-properties-grid">
            {properties.length === 0 ? (
              <p>no properties found</p>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="view-properties-section">
        <Link href="/properties" className="view-properties-link">
          View All Properties
        </Link>
      </section>
    </>
  );
};
export const dynamic = 'force-dynamic';
export default HomeProperties;
