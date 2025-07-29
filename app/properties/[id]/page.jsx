'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBookmark,
  FaShare,
  FaPaperPlane,
} from 'react-icons/fa6';
import Image from 'next/image';
import PropertyDetails from '@/components/PropertyDetails';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButton from '@/components/ShareButton';
import ContactForm from '@/components/ContactForm';

const PropertyId = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('this is the propety', property);
  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return;
      try {
        const data = await fetchProperty(id);
        setProperty(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (!property) {
      fetchPropertyData();
    }
  }, [id]);
  if (!property || loading) return <LoadingPage />;
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="back-container">
          <Link href="/properties" className="back-link">
            <FaArrowLeft className="back-icon" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="property-details-section">
        <div className="property-details-container">
          <div className="property-details-grid">
            <PropertyDetails property={property} />
            {/* Sidebar */}
            <aside className="property-sidebar">
              <BookmarkButton property={property} />
              <ShareButton property={property} />
              {/* Contact Form */}
              <ContactForm />
            </aside>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="property-images-section">
        <div className="property-images-container">
          <div className="property-images-grid">
            {property.images.map((imageUrl, index) => (
              <div key={index} className="property-image-col">
                <Image
                  src={imageUrl}
                  alt=""
                  className="property-image-main"
                  width={800}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyId;
