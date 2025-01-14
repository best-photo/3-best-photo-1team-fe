'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';
import CommonInputSection from '@/src/components/common/commonInputSection/commonInputSection';
import Dropdown from '@/src/components/common/filterDropdown/organisms/DropDown';
import Image from 'next/image';

interface CardData {
  cardname: string;
  grade: string;
  genre: string;
  price: number;
  totalQuantity: number;
  description: string;
}

export default function CreatePhotoCard() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardData>({
    mode: 'onChange',
  });

  const router = useRouter();

  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoName: '사진 업로드',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null); // 사진 업로드 오류 메시지 상태 추가

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setPhotoError('이미지 파일만 업로드 가능합니다.');
        setFormData({ ...formData, photo: null, photoName: '사진 업로드' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('파일 크기는 5MB를 초과할 수 없습니다.');
        setFormData({ ...formData, photo: null, photoName: '사진 업로드' });
        return;
      }
      setPhotoError(null); // 오류 메시지 초기화
      setFormData({ ...formData, photo: file, photoName: file.name });
    }
  };

  const onSubmit = async (data: CardData) => {
    if (isLoading) return;
    setIsLoading(true);

    const body = new FormData();
    body.append('cardname', data.cardname);
    body.append('grade', data.grade);
    body.append('genre', data.genre);
    body.append('price', data.price.toString());
    body.append('totalQuantity', data.totalQuantity.toString());
    body.append('description', data.description);

    if (formData.photo) {
      body.append('photo', formData.photo);
    } else {
      setPhotoError('사진을 업로드해주세요.'); // 사진이 없을 경우 오류 메시지 설정
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/createcard', {
        method: 'POST',
        body,
      });

      if (response.ok) {
        router.push(
          `/createcard/success?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.cardname)}`,
        );
      } else {
        console.error('API Error:', response.statusText);
        router.push(
          `/createcard/fail?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.cardname)}`,
        );
      }
    } catch (error) {
      console.error('Network Error:', error);
      router.push(
        `/createcard/fail?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.cardname)}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-black p-[15px] lg:p-[40px] md:p-[20px]'>
      <div className='w-full max-w-[1480px]'>
        <header className='text-center md:text-left mb-[20px]'>
          <div
            onClick={() => router.push('/mygallery')}
            className='cursor-pointer block md:hidden'
          >
            <Image
              src='/icons/direction/back.svg'
              width={22}
              height={22}
              alt='Back Icon'
            />
          </div>
          <h1 className='font-baskin lg:text-[62px] md:text-[48px] sm:text-[20px]'>
            포토카드 생성
          </h1>
          <div className='border-2 border-gray-100 lg:block md:block sm:hidden'></div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center md:items-start justify-center w-full max-w-[520px] gap-[20px] mx-auto'
        >
          <div className='w-full'>
            <CommonInputSection<CardData>
              register={register}
              errors={errors}
              label='포토카드 이름'
              type='text'
              name='cardname'
              placeholder='포토카드 이름을 입력해주세요.'
              validation={{
                required: '포토카드 이름을 입력해주세요.',
                maxLength: {
                  value: 30,
                  message: '포토카드 이름은 최대 30자까지 입력 가능합니다.',
                },
              }}
            />
          </div>

          <div className='flex flex-col gap-[10px] mb-5 w-full'>
            <label className='text-left text-base md:text-base lg:text-lg font-normal'>
              등급
            </label>
            <Dropdown
              options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
              selectedValue={watch('grade')}
              placeholder='등급을 선택해 주세요'
              onValueChange={(value) => setValue('grade', value)}
              className='appearance-none px-[16px] py-[14px] w-full text-[14px] md:text-[16px] bg-black border border-gray-200 text-gray-200 h-[50px] md:h-[60px] rounded cursor-pointer flex items-center justify-between'
              listClassName='right-[1px] top-[60px]'
              itemClassName='px-[16px] py-[14px] text-gray-200 mr-[15px]'
            />
          </div>

          <div className='flex flex-col gap-[10px] mb-5 w-full'>
            <label className='text-base md:text-base lg:text-lg font-normal'>
              장르
            </label>
            <Dropdown
              options={['여행', '풍경', '인물', '사물']}
              selectedValue={watch('genre')}
              placeholder='장르'
              onValueChange={(value) => setValue('genre', value)}
              className='appearance-none px-[16px] py-[14px] w-full text-[14px] md:text-[16px] bg-black border border-gray-200 text-gray-200 h-[50px] md:h-[60px] rounded cursor-pointer flex items-center justify-between'
              listClassName='right-[1px] top-[60px]'
              itemClassName='px-[16px] py-[14px] text-gray-200 mr-[15px]'
            />
          </div>

          <div className='w-full'>
            <CommonInputSection<CardData>
              register={register}
              errors={errors}
              label='가격'
              type='string'
              name='price'
              placeholder='가격을 입력해 주세요'
              validation={{
                required: '가격을 입력해 주세요',
                pattern: {
                  value: /^[0-9]{1,10}$/,
                  message: '숫자로 입력해 주세요',
                },
              }}
            />
          </div>

          <div className='w-full'>
            <CommonInputSection<CardData>
              register={register}
              errors={errors}
              label='총 발행량'
              type='string'
              name='totalQuantity'
              placeholder='총 발행량을 입력해 주세요'
              validation={{
                required: '총 발행량을 입력해 주세요',
                pattern: {
                  value: /^[0-9]{1,10}$/,
                  message: '숫자로 입력해 주세요',
                },
              }}
            />
          </div>

          <div className='w-full'>
            <label className='text-base md:text-base lg:text-lg font-normal'>
              사진 업로드
            </label>
            <div className='flex items-center gap-4'>
              <span className='flex-grow bg-black border border-gray-200 px-[16px] py-[14px] text-[14px] md:text-[16px] rounded text-gray-200 font-light truncate'>
                {formData.photoName || '사진 업로드'}
              </span>
              <label
                htmlFor='fileUpload'
                className='w-[120px] md:w-[150px] h-[50px] md:h-[60px] bg-black text-main rounded text-center flex items-center justify-center cursor-pointer border border-main'
              >
                파일 선택
              </label>
              <input
                type='file'
                id='fileUpload'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />
            </div>
            {photoError && (
              <p className='text-red text-sm mt-2'>{photoError}</p>
            )}
          </div>

          <div className='w-full'>
            <CommonInputSection<CardData>
              register={register}
              errors={errors}
              label='설명'
              type='string'
              name='description'
              placeholder='포토카드에 대한 설명을 입력해주세요'
              inputType='textarea'
              validation={{
                required: '설명을 입력해 주세요',
                minLength: {
                  value: 10,
                  message: '설명을 10자 이상 입력해주세요.',
                },
              }}
            />
          </div>

          <div className='mt-[20px] w-full'>
            <CommonBtn
              variant='primary'
              width='custom'
              heightPreset={2}
              type='submit'
              className='w-full h-[50px] md:h-[60px] bg-main text-black font-bold rounded mt-[20px] text-[14px] md:text-[16px]'
            >
              생성하기
            </CommonBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
