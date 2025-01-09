import { useProfileModalStore } from '@/src/store/useProfileModalStore';

const ProfileModal = ({
  userName,
  points,
}: {
  userName: string;
  points: number;
}) => {
  const { isProfileModalOpen, toggleProfileModal, closeProfileModal } =
    useProfileModalStore();

  return (
    <div
      className='relative'
      onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
    >
      {/* 버튼: 모달 열기/닫기 */}
      <button
        className='relative'
        onClick={toggleProfileModal}
      >
        <div className='font-baskin'>{userName}</div>
      </button>

      {/* 모달 */}
      {isProfileModalOpen && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={closeProfileModal} // 외부 클릭 시 닫기
          ></div>
          <div className='absolute top-full right-0 mt-2 w-[260px] bg-black text-white z-20'>
            <div className='p-[20px] h-[103px] flex flex-col justify-between border-bottom border-gray-400'>
              <p className='text-[18px] font-bold'>안녕하세요, {userName}님!</p>
              <p className='text-[12px] flex justify-between'>
                <span className='text-gray-300'>보유 포인트</span>
                <span className='text-main'>{points} P</span>
              </p>
            </div>
            <div className='p-[20px] h-[103px] text-[14px] font-bold flex flex-col justify-between'>
              <div>마이갤러리</div>
              <div>나의 판매 포토카드</div>
              {/* <Link href='/my-gallery'>마이갤러리</Link>
              <Link href='/my-sell-cards'>나의 판매 포토카드</Link> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileModal;
