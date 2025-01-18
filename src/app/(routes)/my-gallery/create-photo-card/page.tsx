'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';
import { CreateCardData } from '@/src/services/mygalleryPhotocardService';
import CommonInputSection from '@/src/components/common/commonInputSection/commonInputSection';
import Dropdown from '@/src/components/common/CommonDropDown/DropDown';
import Image from 'next/image';
import createCardAxios from '@/src/lib/axios/createCardAxios';

export default function CreatePhotoCard() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCardData>({
    mode: 'onChange',
  });

  const router = useRouter();
  const [formData, setFormData] = useState({
    imageUrl: null as File | null,
    photoName: '사진 업로드',
  });

  const [photoError, setPhotoError] = useState<string | null>(null); // 사진 업로드 오류 메시지 상태 추가

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photoName: file.name, // 파일 이름을 상태에 저장
        imageUrl: file, // 파일 객체를 상태에 저장
      });
    } else {
      setFormData({
        ...formData,
        photoName: '',
        imageUrl: null,
      });
    }
  };

  const genreTranslation: { [key: string]: string } = {
    여행: 'TRAVEL',
    풍경: 'LANDSCAPE',
    인물: 'PORTRAIT',
    사물: 'OBJECT',
  };

  const onSubmit = async (data: CreateCardData) => {
    const formDataToSend = new FormData();

    // 이미지 파일 검증 및 추가
    const fileInput =
      document.querySelector<HTMLInputElement>('#imageFileInput'); // 파일 입력 필드의 ID를 정확히 입력하세요.
    const file = fileInput?.files?.[0]; // 파일이 선택되었는지 확인
    if (file) {
      formDataToSend.append('imageUrl', file); // 'imageUrl' 필드에 파일 추가
    } else {
      setPhotoError('이미지 파일이 존재하지 않거나 선택되지 않았습니다.'); // 사용자에게 오류 메시지 표시
      return; // 파일이 없으면 중단
    }

    // 나머지 데이터를 FormData에 개별적으로 추가
    formDataToSend.append('name', data.name);
    formDataToSend.append('grade', data.grade);
    formDataToSend.append('genre', genreTranslation[data.genre] || data.genre);
    formDataToSend.append('price', String(data.price)); // 숫자를 문자열로 변환
    formDataToSend.append('totalQuantity', String(data.totalQuantity)); // 숫자를 문자열로 변환
    formDataToSend.append('description', data.description);

    // FormData에 추가된 내용 확인 (forEach 사용)
    formDataToSend.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // 서버로 전송
    try {
      const response = await createCardAxios.post(
        '/users/my-cards',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer your-access-token`, // 인증 토큰
            // Content-Type은 따로 지정할 필요 없음, 브라우저가 자동으로 'multipart/form-data'로 설정합니다.
          },
        },
      );

      // 성공적으로 데이터 전송
      if (response.status === 201) {
        router.push(
          `/my-gallery/create-photo-card/success?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.name)}`,
        );
      } else {
        console.error('API Error:', response.statusText);
        router.push(
          `/my-gallery/create-photo-card/fail?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.name)}`,
        );
      }
    } catch (error) {
      console.error('Network Error:', error);
      router.push(
        `/my-gallery/create-photo-card/fail?grade=${encodeURIComponent(data.grade)}&name=${encodeURIComponent(data.name)}`,
      );
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-black p-[15px] lg:p-[40px] md:p-[20px]'>
      <div className='w-full max-w-[1480px]'>
        <header className='text-center md:text-left mb-[20px]'>
          <div
            onClick={() => router.push('/my-gallery')}
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
            <CommonInputSection<CreateCardData>
              register={register}
              errors={errors}
              label='포토카드 이름'
              type='text'
              name='name'
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
            <CommonInputSection<CreateCardData>
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
            <CommonInputSection<CreateCardData>
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
                htmlFor='imageFileInput'
                className='w-[120px] md:w-[150px] h-[50px] md:h-[60px] bg-black text-main rounded text-center flex items-center justify-center cursor-pointer border border-main'
              >
                파일 선택
              </label>
              <input
                type='file'
                id='imageFileInput'
                accept='image/*'
                name='imageUrl'
                onChange={handleFileChange}
                className='hidden'
              />
            </div>
            {photoError && (
              <div className='text-red-500 text-xs'>{photoError}</div>
            )}
          </div>

          <div className='w-full'>
            <CommonInputSection<CreateCardData>
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
