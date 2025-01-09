'use client';

import React, { useState } from 'react';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import MarketplaceSearchBox from '../../components/marketplace/MarketplaceSearchBox';
import { mockPhotoCards } from '@/src/components/marketplace/mockData';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';

export default function Home() {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);

  const userId: string | null = '1';

  return (
    <>
      <div className='pt-[60px]'>
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

      <div className='flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]'>
        {mockPhotoCards.map((card, index) => (
          <PhotoCardListItem
            key={index}
            {...card}
          />
        ))}
      </div>
    </>
  );
}
