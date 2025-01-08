import MainLayout from '@/src/components/layout/MainLayout';
import Link from 'next/link';

export default function RoutesNotFound() {
  return (
    <MainLayout>
      <div className='flex flex-col items-center justify-center min-h-screen -mt-[60px] sm:-mt-[70px] md:-mt-[80px]'>
        <div className='font-black text-white leading-tight -mt-[30px] sm:-mt-[35px] md:-mt-[40px] text-[135px] md:text-[200px] lg:text-[250px]'>
          4<span className='text-main'>0</span>4
        </div>
        <h1 className='font-bold text-[20px] md:text-[27px] lg:text-[33px]'>
          페이지가 없거나 접근할 수 없어요
        </h1>
        <p className='mt-[10px] text-[15px] md:text-[16px] lg:text-[19px]'>
          입력하신 주소가 맞는지 다시 확인 주세요
        </p>
        <Link href='/'>
          <div className='font-baskin text-[15px] md:text-[16px] lg:text-[19px] text-black bg-main px-[20px] py-[10px] md:px-[30px] md:py-[15px] mt-[30px]'>
            마켓 플레이스로 {'  >'}
          </div>
        </Link>
      </div>
    </MainLayout>
  );
}
