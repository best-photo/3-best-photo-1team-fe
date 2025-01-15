import { usePathname } from 'next/navigation';
import MobileNavDefault from './MobileNavDefault';
import MobileNavWithBack from './MobileNavWithBack';
import MobileNotificationMessages from './MobileNotificationMessages';
import { useNotificationStore } from '@/src/store/useNotificationStore';

type MobileNavProps = {
  closeNotification: () => void;
};

const MobileNav = ({ closeNotification }: MobileNavProps) => {
  const { isNotificationOpen } = useNotificationStore();
  const pathname = usePathname();

  if (pathname.split('/')[1] === 'my-gallery') {
    return (
      <MobileNavWithBack
        title='마이갤러리'
        backPath='/my-gallery'
      />
    );
  }

  if (isNotificationOpen) {
    return (
      <>
        <MobileNavWithBack
          title='알림'
          onClick={closeNotification}
        />
        <MobileNotificationMessages />
      </>
    );
  }

  return <MobileNavDefault />;
};

export default MobileNav;
