import Input from '../../components/Input';

const MessageInput = () => {
  return (
    <form className='relative w-full'>
      <Input placeholder='Send message...' />
      <button className='absolute top-[50%] translate-y-[-50%] right-4 font-semibold text-sm lg:text-base'>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
