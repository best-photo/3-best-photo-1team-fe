'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultsProps } from '@/src/components/SuccessOrFail/Result';
import ResultSection from '@/src/components/SuccessOrFail/Result';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';

function CreatePhotoSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const grade = searchParams.get('grade');

  const handleNavigation = () => {
    router.push('/my-gallery');
  };

  const result: ResultsProps = {
    variant: '포토카드 생성',
    isSuccess: true,
    text: `[${grade?.toUpperCase() || '-'} | ${
      name || '-'
    }] 포토카드 생성에 성공했습니다!`,
    backPathUrl: '/my-gallery',
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
          마이갤러리에서 확인하기
        </CommonBtn>
      </div>
    </div>
  );
}

export default function CreatePhotoSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePhotoSuccessContent />
    </Suspense>
  );
}
