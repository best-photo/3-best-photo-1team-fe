'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsProps } from '@/src/components/SuccessOrFail/Result';
import ResultSection from '@/src/components/SuccessOrFail/Result';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';

function ExchangeFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const grade = searchParams.get('grade');
  const name = decodeURIComponent(searchParams.get('name') || '-');
  const quantity = searchParams.get('quantity') || '1';

  const handleNavigation = () => {
    router.push('/');
  };

  const result: ResultsProps = {
    variant: '판매',
    isSuccess: false,
    text: `[${grade?.toUpperCase() || '-'} | ${name || '-'}] ${quantity || '-'}장 판매 등록에 실패했습니다!`,
    backPathUrl: '/',
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
          마켓플레이스로 돌아가기
        </CommonBtn>
      </div>
    </div>
  );
}

export default function ExchangeFailurePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExchangeFailureContent />
    </Suspense>
  );
}
