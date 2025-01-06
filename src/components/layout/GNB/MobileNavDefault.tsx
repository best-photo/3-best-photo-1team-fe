import Image from 'next/image';
import LogoImage from '@/public/images/logo.png';
import MenuIcon from '@/public/icons/menu.svg';
import NotificationBell from './NotificationBell';

const MobileNavDefault = () => {
  return (
    <div className='flex items-center justify-between h-full px-5'>
      <button>
        <Image
          src={MenuIcon}
          alt='메뉴'
          height={22}
          width={22}
        />
      </button>

      <Image
        src={LogoImage}
        alt='로고'
        width={83}
        height={15}
      />

      <NotificationBell />
    </div>
  );
};

export default MobileNavDefault;
