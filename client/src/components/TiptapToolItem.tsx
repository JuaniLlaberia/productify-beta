import type { ReactElement } from 'react';

type TiptapItemType = {
  method: () => void;
  icon: ReactElement;
  isActive?: boolean;
};

const TiptapToolItem = ({ method, icon, isActive }: TiptapItemType) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    method();
  };

  return (
    <li
      className={`flex items-center text-text-light-1 dark:text-text-dark-1 text-xl rounded-lg md:hover:bg-bg-light-hover-2
      ${isActive ? 'bg-bg-light-hover-2' : ''} transition-colors`}
    >
      <button
        className='p-2 px-3'
        onClick={e => handleClick(e)}
      >
        {icon}
      </button>
    </li>
  );
};

export default TiptapToolItem;
