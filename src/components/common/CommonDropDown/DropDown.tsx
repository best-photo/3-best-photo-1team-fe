import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
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
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
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

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className={`relative cursor-pointer ${className} ${
        selectedValue ? 'text-center' : ''
      }`}
    >
      <button
        className={`w-[180px] h-[50px] text-gray-300 rounded-[2px] text-center font-semibold ${buttonClassName}`}
      >
        {selectedValue || placeholder}
        <Image
          src='/icons/dropdown.svg'
          alt='dropdown Icon'
          className='absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10'
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <ul
          className={`absolute w-full bg-black text-gray-300 border border-gray-300 rounded-[2px] mt-1 ${listClassName}`}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`p-2 hover:bg-gray-500 cursor-pointer text-center ${itemClassName} text-[16px] font-normal leading-[23.17px] text-left`}
              style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
