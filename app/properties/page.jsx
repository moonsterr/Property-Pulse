import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchProperties } from '@/utils/requests';

const PropertiesPage = async () => {
  const properties = await fetchProperties();
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
      </div>
    </section>
  );
};
export default PropertiesPage;
