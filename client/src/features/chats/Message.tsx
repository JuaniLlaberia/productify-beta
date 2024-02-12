type MessageCompType = {
  text: string;
  sender: string;
  isAuthSender: boolean;
  isFirstInGroup: boolean;
};

const Message = ({
  text,
  sender,
  isAuthSender,
  isFirstInGroup,
}: MessageCompType) => {
  return (
    <li
      className={`flex items-start gap-2 ${!isFirstInGroup ? 'mt-0' : 'mt-3'}`}
    >
      {isFirstInGroup && <div className='w-8 h-8 rounded-xl bg-red-600'></div>}
      <div>
        {isFirstInGroup && (
          <p className='flex items-center gap-3'>
            <span className='text-text-light-1 text-sm font-semibold'>
              Juan
            </span>
            <span className='text-text-light-2 text-xs'>12/04/2024</span>
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
