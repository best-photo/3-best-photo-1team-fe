'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsProps } from '@/src/components/SuccessOrFail/Result';
import ResultSection from '@/src/components/SuccessOrFail/Result';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';

function ExchangeSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade');
  const name = searchParams.get('name');
  const quantity = searchParams.get('quantity');

  const handleNavigation = () => {
    router.push('/my-sales');
  };

  const result: ResultsProps = {
    variant: '교환 제시',
    isSuccess: true,
    text: '포토카드 교환 제시에 성공했습니다!',
    backPathUrl: '/my-sales',
  };

  return (
    <div className='flex justify-center items-center fixed inset-0 bg-black'>
      <div>
        <ResultSection result={result} />
      </div>
      <div className='mt-15 h-15 flex justify-center cursor-pointer z-20'>
        <CommonBtn
          variant='secondary'
          heightPreset={2}
          width='custom'
          onClick={handleNavigation}
          className='mt-[150px] lg:w-[440px] md:w-[226px] sm:w-[226px] lg:text-[18px] md:text-[16px]'
        >
          나의 판매 포토카드에서 확인하기
        </CommonBtn>
      </div>
    </div>
  );
}

export default function ExchangeSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExchangeSuccessContent />
    </Suspense>
  );
}
