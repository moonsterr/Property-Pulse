'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';
import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './UnreadMessageCount';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [toggleMobile, setToggleMobile] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [providers, setProviders] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  console.log('providers', providers);
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-inner">
          <div className="mobile-menu-button-wrapper">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="mobile-menu-button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setToggleMobile((prevToggle) => !prevToggle)}
            >
              <svg
                className="menu-icon"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="logo-and-links">
            <Link className="logo" href="/">
              <Image src={logo} alt="PropertyPulsee" />
              <span className="logo-text">PropertyPulse</span>
            </Link>
            <div className="desktop-links">
              <Link
                href="/"
                className={`nav-link  ${pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className={`nav-link  ${
                  pathname === '/properties' ? 'active' : ''
                }`}
              >
                Properties
              </Link>
              {session && (
                <Link
                  href="/properties/add"
                  className={`nav-link  ${
                    pathname === '/properties/add' ? 'active' : ''
                  }`}
                >
                  Add Property
                </Link>
              )}
            </div>
          </div>

          {!session && (
            <div className="auth-button-wrapper">
              {providers &&
                Object.values(providers).map((provider, index) => {
                  return (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className="auth-button"
                    >
                      <FaGoogle className="icon" />
                      <span>Login or Register</span>
                    </button>
                  );
                })}
            </div>
          )}

          {session && (
            <div className="user-menu">
              <Link href="/messages" className="notification-button">
                <button className="notification-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session} />
              </Link>

              <div className="profile-menu-wrapper">
                <button
                  id="user-menu-button"
                  className="profile-button"
                  onClick={() => setToggleProfile((prevToggle) => !prevToggle)}
                >
                  <Image
                    src={profileImage || profileDefault}
                    alt=""
                    width={50}
                    height={50}
                  />
                </button>
                {toggleProfile && (
                  <div id="user-menu" className="profile-dropdown hidden">
                    <Link
                      onClick={() => setToggleProfile(false)}
                      href="/profile"
                    >
                      Your Profile
                    </Link>
                    <Link
                      onClick={() => setToggleProfile(false)}
                      href="/properties/saved"
                    >
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setToggleProfile(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {toggleMobile && (
        <div className="mobile-menu hidden" id="mobile-menu">
          <Link
            href="/"
            className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`mobile-nav-link ${
              pathname === '/properties' ? 'active' : ''
            }`}
          >
            Properties
          </Link>
          {session && (
            <Link
              href="/property/add"
              className={`mobile-nav-link ${
                pathname === '/properties/add' ? 'active' : ''
              }`}
            >
              Add Property
            </Link>
          )}
          {!session &&
            providers &&
            Object.values(providers).map((provider, index) => (
              <button
                onClick={() => signIn(provider.id)}
                key={index}
                className="mobile-auth-button"
              >
                <i className="fa-brands fa-google"></i>
                <span>Login or Register</span>
              </button>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
