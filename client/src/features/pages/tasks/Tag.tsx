const Tag = ({
  label,
  color,
}: {
  label: string;
  color: 'red' | 'blue' | 'green' | 'purple' | 'yellow' | 'gray' | 'orange';
}) => {
  console.log(color);

  return (
    <span
      className={`
        bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300
         text-sm xl:text-base font-semibold me-2 px-4 py-1 rounded-lg shadow-sm capitalize`}
    >
      {label}
    </span>
  );
};

export default Tag;
