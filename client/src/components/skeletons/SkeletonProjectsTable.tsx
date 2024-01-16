const SkeletonProjectsTable = () => {
  return (
    <ul className='flex flex-col gap-2 w-full xl:max-w-[40vw]'>
      {[1, 2, 3, 4, 5].map(item => (
        <li
          key={item}
          className='flex items-center px-3 animate-pulse w-full bg-bg-light-hover-2 h-24 lg:h-32 rounded-lg '
        >
          <div className='bg-gray-200 h-20 w-20 rounded-md'></div>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonProjectsTable;
