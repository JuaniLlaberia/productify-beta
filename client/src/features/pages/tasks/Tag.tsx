const Tag = ({ tag }: { tag: 'pending' | 'progress' | 'finished' }) => {
  return (
    <span
      className={`
        ${
          tag === 'pending'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            : tag === 'progress'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            : tag === 'finished'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : ''
        }
         text-sm xl:text-base font-semibold me-2 px-4 py-1 rounded-lg shadow-sm capitalize`}
    >
      {tag}
    </span>
  );
};

export default Tag;
