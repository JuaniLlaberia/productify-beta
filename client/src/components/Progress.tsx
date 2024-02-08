const Progress = ({ value, total }: { value: number; total: number }) => {
  return (
    <div className='flex w-full h-2.5 rounded-full overflow-hidden bg-bg-light-hover-2 dark:bg-neutral-50/20'>
      <div
        className={`rounded-ful overflow-hidden ${
          value === total
            ? 'bg-green-400 dark:bg-green-500'
            : 'bg-bg-dark-2 dark:bg-bg-light-2'
        }  transition-all duration-300`}
        style={{ width: `${(value / total) * 100}%` }}
      />
    </div>
  );
};

export default Progress;
