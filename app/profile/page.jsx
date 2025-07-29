'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { useState, useEffect } from 'react';
import LoadingPage from '../loading';
import { toast } from 'react-toastify';
const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleDeleteProperty(id) {
    console.log(id);
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== id
        );
        setProperties(updatedProperties);
        toast.success('Property Deleted');
      } else {
        toast.error('failed to delete property');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status !== 200) return;

        const data = await res.json();
        setProperties(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);
  if (loading || !properties) return <LoadingPage />;
  console.log('these are the props', properties);
  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-heading">Your Profile</h1>
          <div className="profile-flex">
            <div className="profile-left">
              <div className="profile-image-wrapper">
                <Image
                  className="profile-image"
                  src={profileImage ? profileImage : profileDefault}
                  alt="User"
                  width={100}
                  height={100}
                />
              </div>
              <p className="profile-text">
                <span className="profile-label">Name: </span> {profileName}
              </p>
              <p className="profile-text">
                <span className="profile-label">Email: </span>
                {profileEmail}
              </p>
            </div>

            <div className="profile-right">
              <h2 className="listings-heading">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {properties.map((property) => (
                <div className="listing">
                  <Link href={`/properties/${property._id}`}>
                    <Image
                      className="listing-image"
                      src={property.images[0]}
                      alt="Property 1"
                      width={1200}
                      height={1200}
                      sizes={1200}
                    />
                  </Link>
                  <div className="listing-details">
                    <p className="listing-title">{property.name}</p>
                    <p className="listing-address">
                      Address: {property.location.street},{' '}
                      {property.location.city} {property.location.state},{' '}
                      {property.location.zipcode}
                    </p>
                  </div>
                  <div className="listing-actions">
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className="edit-button"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProperty(property._id)}
                      className="delete-button"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
