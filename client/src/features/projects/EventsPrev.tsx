import { HiOutlineCalendarDays } from 'react-icons/hi2';

const EventsPrev = ({ events = [] }: { events: [] }) => {
  return (
    <section>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-text-light-2 dark:text-text-dark-2 lg:text-lg xl:text-xl'>
          Today Events
        </h2>
        <p className='text-text-light-2 dark:text-text-dark-2'>26 Jan</p>
      </div>
      {events.length > 0 ? (
        <ul className='py-3 h-full flex justify-center items-center'>
          <li className='w-full flex items-center justify-between p-3 text-text-light-1 dark:text-text-dark-1 bg-bg-light-2 dark:bg-bg-dark-2 border border-border-light dark:border-border-dark rounded-lg shadow-sm'>
            <div className='flex items-center gap-2'>
              <div className='bg-[#9a989820] p-2 rounded-lg'>
                <HiOutlineCalendarDays size={20} />
              </div>
              <p className='line-clamp-1'>Front team</p>
            </div>
            <p className='font-semibold'>18:30</p>
          </li>
        </ul>
      ) : (
        <p className='text-center py-6 text-sm text-text-light-2 dark:text-text-dark-2'>
          No upcomming events
        </p>
      )}
    </section>
  );
};

export default EventsPrev;
