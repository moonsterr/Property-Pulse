import PropertyCard from '@/components/PropertyCard';
import { fetchProperties  } from '@/utils/requests';

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
