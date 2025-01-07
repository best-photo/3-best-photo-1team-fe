'use client';

import React, { useState } from 'react';
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader';
import MarketplaceSearchBox from '../components/marketplace/MarketplaceSearchBox';

export default function Home() {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);

  const userId: string | null = '1';

  return (
    <>
      <div className='bg-black text-white min-h-screen pt-[60px]'>
        <MarketplaceHeader
          isAlertVisible={isAlertVisible}
          setAlertVisible={setAlertVisible}
          isLoginAlertVisible={isLoginAlertVisible}
          setIsLoginAlertVisible={setIsLoginAlertVisible}
          isProductVisible={isProductVisible}
          setProductVisible={setProductVisible}
          userId={userId}
        />
        <div className='border-b border-white w-[1480px] mx-auto mt-[20px]'></div>
        <MarketplaceSearchBox />
      </div>
    </>
  );
}
