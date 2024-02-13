import { formatDate } from '../../utils/formatDate';

type MessageCompType = {
  text: string;
  sender: {
    _id: string;
    firstName: string;
  };
  isFirstInGroup: boolean;
  date: Date;
};

const Message = ({ text, sender, isFirstInGroup, date }: MessageCompType) => {
  console.log(date);

  return (
    <li
      className={`flex items-start gap-2 ${!isFirstInGroup ? 'mt-0' : 'mt-3'}`}
    >
      {isFirstInGroup && <div className='w-8 h-8 rounded-xl bg-red-600'></div>}
      <div>
        {isFirstInGroup && (
          <p className='flex items-center gap-3'>
            <span className='text-text-light-1 text-sm font-semibold'>
              {sender.firstName}
            </span>
            <span className='text-text-light-2 text-xs'>
              {formatDate(new Date(date))}
            </span>
          </p>
        )}
        <p
          className={`relative flex flex-col ${
            !isFirstInGroup ? 'ml-10' : ''
          } max-w-[75dvw] break-words overflow-hidden xl:text-lg`}
        >
          {text}
        </p>
      </div>
    </li>
  );
};

export default Message;
