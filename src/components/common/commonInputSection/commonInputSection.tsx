import { FieldValues } from 'react-hook-form';
import { CommonInputSectionProps } from './commonInputSection.types';
import cn from '@/src/lib/cn';
import { useState } from 'react';
import Visible from '@/public/icons/visibility/visible.svg';
import Invisible from '@/public/icons/visibility/invisible.svg';
import Image from 'next/image';

export default function CommonInputSection<T extends FieldValues>({
  register,
  errors,
  label,
  name,
  placeholder,
  type = 'text',
  validation,
  inputType = 'input',
  rows = 5,
}: CommonInputSectionProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name.includes('password');

  const inputProps = {
    type: isPassword ? (showPassword ? 'text' : 'password') : type,
    className: cn(
      'text-gray-200 bg-black focus:bg-gray-500 placeholder:text-gray-200 border border-gray-200 px-5 py-[18.5px] w-full',
      errors[name] && 'border border-red',
    ),
    placeholder,
    ...register(name, validation),
  };

  return (
    <div className='flex flex-col gap-[10px] mb-5 w-full'>
      <label className='text-base md:text-base lg:text-lg font-normal'>
        {label}
      </label>
      <div className='relative'>
        {inputType === 'textarea' ? (
          <textarea
            rows={rows}
            {...inputProps}
          />
        ) : (
          <input {...inputProps} />
        )}
        {isPassword && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-[25px] top-[20px] cursor-pointer'
          >
            <Image
              src={showPassword ? Visible : Invisible}
              alt='비밀번호 표시 토글 버튼'
            />
          </button>
        )}
      </div>
      {errors[name]?.message && (
        <span className='text-red font-light'>
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}
