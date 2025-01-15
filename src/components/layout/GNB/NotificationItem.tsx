import { formatTimeAgo } from '@/src/utils/formatTimeAgo';
import cn from '@/src/utils/cn';

type NotificationItemProps = {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  onClick: (id: string) => void;
};

const NotificationItem = ({
  id,
  content,
  isRead,
  createdAt,
  onClick,
}: NotificationItemProps) => {
  return (
    <li
      key={id}
      className={cn(
        'p-5 w-[300px] border-b border-gray-400',
        !isRead ? 'bg-gray-500 text-white' : 'bg-black text-gray-300',
      )}
    >
      <p
        className='text-sm mb-2.5 cursor-pointer hover:underline'
        onClick={() => onClick(id)}
      >
        {content}
      </p>
      <span className='text-gray-300 text-xs'>{formatTimeAgo(createdAt)}</span>
    </li>
  );
};

export default NotificationItem;
