import Image from 'next/image';
import closeIcon from '@/public/icons/close.svg';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function FilterModalHeader() {
  const setModalOpen = useFilterStore((state) => state.setModalOpen);

  return (
    <header className='relative flex p-[15px] items-center justify-center'>
      <h1>필터</h1>
      <button
        className='absolute right-[15px]'
        onClick={() => setModalOpen(false)}
      >
        <Image
          src={closeIcon}
          alt='닫기 버튼'
          width={24}
          height={24}
          priority
        />
      </button>
    </header>
  );
}
