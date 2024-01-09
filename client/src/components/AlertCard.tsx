import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

const AlertCard = ({ message }: { message: string }) => {
  return (
    <section className='flex items-center gap-5 py-2 px-4 bg-[#ff260017] text-[#ff7b5b] border border-[#ff3c0071] mb-4 rounded-md'>
      <span className='text-3xl'>
        <HiOutlineExclamationTriangle />
      </span>
      <p>{message}</p>
    </section>
  );
};

export default AlertCard;
