import { MessageType } from '../../types/chatTypes';
import { formatDate } from '../../utils/formatDate';
import { formatDateDistance } from '../../utils/formatDateDistance';

type MessageCompType = {
  messageData: MessageType;
  isFirstInGroup: boolean;
};

const Message = ({ messageData, isFirstInGroup }: MessageCompType) => {
  const { sendBy, content, createdAt } = messageData;

  return (
    <li
      className={`relative group flex items-start gap-4 ${
        !isFirstInGroup
          ? 'mt-0 hover:bg-bg-light-hover-2 hover:rounded-md transition-all'
          : 'mt-3 '
      }`}
    >
      {isFirstInGroup ? (
        sendBy.profileImg ? (
          <img
            draggable={false}
            src={sendBy.profileImg}
            className='w-8 h-8 rounded-xl border border-border-light dark:border-border-dark'
          />
        ) : (
          <div className='w-8 h-8 rounded-xl bg-red-600'></div>
        )
      ) : (
        <p className='hidden group-hover:block absolute bottom-[50%] translate-y-[50%] left-1 text-xs text-text-light-2 dark:text-text-dark-2'>
          {
            formatDate(new Date(createdAt!), {
              hour: '2-digit',
              minute: '2-digit',
            }).split(' ')[0]
          }
        </p>
      )}
      <div>
        {isFirstInGroup && (
          <p className='flex items-center gap-2'>
            <span className='text-text-light-1 dark:text-text-dark-1 text-sm font-semibold'>
              {sendBy.firstName}
            </span>
            <span className='text-text-light-2 dark:text-text-dark-2 text-xs'>
              {formatDateDistance(new Date(createdAt!))}
            </span>
          </p>
        )}
        <p
          className={`relative flex flex-col text-text-light-1 dark:text-text-dark-1 ${
            !isFirstInGroup ? 'ml-12' : ''
          } max-w-[75dvw] break-words overflow-hidden xl:text-lg`}
        >
          {content}
        </p>
      </div>
    </li>
  );
};

export default Message;
