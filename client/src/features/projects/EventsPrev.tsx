import { HiOutlineCalendarDays } from 'react-icons/hi2';

const EventsPrev = () => {
  return (
    <section className='mt-8 lg:mt-2 w-full max-h-[300px] bg-bg-light-2 dark:bg-bg-dark-2 border border-border-light dark:border-border-dark rounded-lg py-4 px-3 shadow-sm'>
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center gap-1 font-semibold text-text-light-1 dark:text-text-dark-1'>
          <HiOutlineCalendarDays size={20} /> Today Events
        </h3>
        <p className='text-text-light-2 dark:text-text-dark-2'>26 Jan</p>
      </div>
      <ul className='py-8 h-full flex justify-center items-center'>
        <p className='text-text-light-2 dark:text-text-dark-2'>No events</p>
      </ul>
    </section>
  );
};

export default EventsPrev;
