import Image from 'next/image';
import Link from 'next/link';
import BackIcon from '@/public/icons/direction/back.svg';

type MobileNavWithBackProps = {
  title?: string;
  backPath?: string;
  onClick?: () => void;
};

const MobileNavWithBack = ({
  title,
  backPath,
  onClick,
}: MobileNavWithBackProps) => {
  return (
    <div className='flex items-center h-full px-5'>
      <Link href={backPath || '/'}>
        <Image
          src={BackIcon}
          alt='뒤로가기'
          height={22}
          width={22}
          onClick={onClick}
        />
      </Link>
      <h1 className='font-baskin text-xl text-center w-full'>{title}</h1>
    </div>
  );
};

export default MobileNavWithBack;
