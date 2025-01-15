import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/public/images/logo.png';

const GNBLogo = () => {
  return (
    <div className='relative w-[111px] h-5 lg:w-[140px] lg:h-[25px]'>
      <Link href='/'>
        <Image
          src={LogoImage}
          fill
          alt='로고'
        />
      </Link>
    </div>
  );
};

export default GNBLogo;
