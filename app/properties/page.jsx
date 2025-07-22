import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
const Page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="../">Go back</Link>
      <Hero />
    </div>
  );
};

export default Page;
