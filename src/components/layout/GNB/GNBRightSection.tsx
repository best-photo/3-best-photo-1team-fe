import Link from 'next/link';
import NotificationBell from './NotificationBell';
import { useAuthStore } from '@/src/store/useAuthStore';

const GNBRightSection = () => {
  const { isLogin, login, logout, user } = useAuthStore();
  // 실제 user 추가해야함
  const isLoggedInAndHasInfo = isLogin && user;

  return (
    <div className='flex items-center gap-4'>
      {isLoggedInAndHasInfo ? (
        <div className='flex items-center gap-4'>
          <div>{user.points.toLocaleString()}P</div>
          <NotificationBell />
          <button>
            <div className='font-baskin'> {user.nickName}</div>
          </button>
          <div className='text-gray-400'>|</div>

          <button
            className='text-gray-400'
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-8'>
          <button
            className='text-gray-100'
            onClick={login}
          >
            {`(임시 로그인 버튼)`}
          </button>
          <Link href='/login'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default GNBRightSection;
