'use client';

import { CARD_GRADES } from '@/src/constants/photoCardInformation';
import { FilterOption, useFilterStore } from '@/src/store/useFilterStore';
import cn from '@/src/utils/cn';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Grade from '../../photoCard/atoms/grade/grade';
import dropdownIcon from '@/public/icons/dropdown.svg';

interface DropdownProps {
  options: FilterOption[];
  selectedValue: string;
  placeholder: string;
  onValueChange: (value: FilterOption) => void;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  onClick: () => void;
}

export default function Dropdown({
  options,
  selectedValue,
  placeholder,
  onValueChange,
  className = '',
  buttonClassName = '',
  listClassName = '',
  itemClassName = '',
  onClick,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = useFilterStore((state) => state.selectedOption);
  const onSubmitFilter = useFilterStore((state) => state.onSubmitFilter);

  const toggleDropdown = () => {
    if (!isOpen) onClick();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const prevSelectedOption = useRef(selectedOption);

  useEffect(() => {
    if (!isOpen && prevSelectedOption.current.query !== selectedOption.query) {
      onSubmitFilter();
      prevSelectedOption.current = selectedOption;
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className={`relative cursor-pointer text-left ${className} `}
    >
      <button
        className={`flex items-center justify-between gap-[10px] h-[50px] pl-5 text-left text-gray-300 rounded-[2px] font-semibold ${buttonClassName}`}
      >
        <span className='whitespace-nowrap'>
          {(CARD_GRADES[selectedValue as keyof typeof CARD_GRADES] && (
            <Grade grade={selectedValue as keyof typeof CARD_GRADES} />
          )) ||
            selectedValue ||
            placeholder}
        </span>
        <Image
          src={dropdownIcon}
          alt='dropdown Icon'
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <ul
          className={`absolute w-[154px] bg-black text-gray-300 border border-gray-300 rounded-[2px] mt-1 z-50 ${listClassName}`}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className={cn(
                'p-2 pl-3 hover:bg-gray-500 cursor-pointer text-[16px] font-normal leading-[23.17px] text-left',
                itemClassName,
                selectedOption.value === option.value ? 'bg-black' : '',
              )}
              style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
              onClick={() => onValueChange(option)}
            >
              {CARD_GRADES[option.value as keyof typeof CARD_GRADES] ? (
                <Grade grade={option.value as keyof typeof CARD_GRADES} />
              ) : (
                option.value
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
