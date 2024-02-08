import { ColorsType } from '../../../types/extraTypes';

const getColorClass = (color: ColorsType) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    purple:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    orange:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };

  return colorClasses[color] || colorClasses.gray;
};

const Tag = ({
  label,
  color,
  small,
}: {
  label: string;
  color: ColorsType;
  small?: boolean;
}) => {
  return (
    <span
      className={`${getColorClass(color)} ${
        small ? 'text-xs xl:text-sm' : 'text-sm xl:text-base'
      } font-semibold me-2 px-4 py-1 rounded-lg shadow-sm capitalize`}
    >
      {label}
    </span>
  );
};

export default Tag;
