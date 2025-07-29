import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
const NotFoundPage = () => {
  return (
    <section className="notfound-section">
      <div className="container">
        <div className="notfound-card">
          <div className="icon-wrapper">
            <FaExclamationTriangle className="icon-exclamation"></FaExclamationTriangle>
          </div>
          <div className="text-center">
            <h1 className="heading">Page Not Found</h1>
            <p className="description">
              The page you are looking for does not exist.
            </p>
            <Link href="/" className="home-link">
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NotFoundPage;
