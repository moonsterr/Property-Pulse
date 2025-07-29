import React from 'react';
import Link from 'next/link';
const InfoBox = ({ heading, text, buttonInfo, children, forWho, path }) => {
  return (
    <div className={`card card-${forWho}`}>
      <h2 className="card-title">{heading}</h2>
      <p className="card-text">{text}</p>
      <Link href={path} className="button button-black">
        {buttonInfo}
      </Link>
    </div>
  );
};

export default InfoBox;
