import Image from 'next/image';
import LogoImage from '@/public/images/logo.png';
// import MenuIcon from '@/public/icons/menu.svg';
import ProfileModal from './ProfileModal';
import ProfileBurgerModal from './ProfileBurgerModal';
import NotificationBell from './NotificationBell';
import useAuthStore from '@/src/store/useAuthStore';

const MobileNavDefault = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className='flex items-center justify-between h-full px-5'>
      {isAuthenticated && user ? (
        <ProfileModal
          user={user}
          logout={logout}
        />
      ) : (
        <ProfileBurgerModal />
      )}
      {/* <button>
        <Image
          src={MenuIcon}
          alt='메뉴'
          height={22}
          width={22}
        />
      </button> */}

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
