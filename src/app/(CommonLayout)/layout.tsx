import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import React,{ Suspense } from 'react';


const CommonLayout = ({children}: {children : React.ReactNode} ) => {
  return (
    <div className="">

      <Suspense fallback={<div className="h-16 bg-gray-900" />}>
        <Navbar />
      </Suspense>

      <div className="relative z-10">
          {children}
      </div>

      <Footer />
      <time dateTime="2016-10-25" suppressHydrationWarning />
      
    </div>
  );
};

// container mx-auto px-4
export default CommonLayout;