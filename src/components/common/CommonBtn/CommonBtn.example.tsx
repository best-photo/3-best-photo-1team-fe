import React from 'react';
import { CommonBtn } from './CommonBtn';

const ExampleCommonBtn = () => {
  return (
    <div className='max-w-[500px] mx-auto'>
      <div className='mt-10 max-w-[400px] border-2 border-green-500'>
        <div className='flex'>
          <CommonBtn
            variant='secondary'
            heightPreset={1}
            width='full'
            onClick={() => console.log('버튼 클릭')}
          >
            기본 버튼
          </CommonBtn>
          <CommonBtn
            variant='primary'
            heightPreset={1}
            width='full'
          >
            기본 버튼
          </CommonBtn>
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex gap-6'>
          <CommonBtn
            variant='secondary'
            heightPreset={1}
            width='full'
          >
            기본 버튼
          </CommonBtn>
          <CommonBtn
            variant='primary'
            heightPreset={1}
            width='full'
            isDisabled={true}
          >
            기본 버튼
          </CommonBtn>
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex gap-6'>
          <CommonBtn
            variant='secondary'
            heightPreset={1}
            width='half'
          >
            기본 버튼
          </CommonBtn>
          <CommonBtn
            variant='primary'
            heightPreset={1}
            width='half'
          >
            기본 버튼
          </CommonBtn>
        </div>
      </div>
    </div>
  );
};

export default ExampleCommonBtn;
