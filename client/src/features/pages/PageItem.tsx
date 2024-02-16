import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';
import { HiOutlineViewColumns } from 'react-icons/hi2';

type PageItemType = {
  icon?: ReactElement;
  label: string;
  link: string;
  onClose: () => void;
  noMenu?: boolean;
  pageId?: string;
};

const PageItem = ({ icon, label, link, onClose }: PageItemType) => {
  return (
    <li
      onClick={onClose}
      className='mb-1 group md:hover:bg-bg-dark-3 md:hover:rounded-md'
    >
      <NavLink
        to={link}
        id={`${label}-${link}`}
        className='page-item flex items-center justify-between px-1 py-1.5 text-text-dark-1'
      >
        <h3 className='flex items-center gap-2 lg:gap-3'>
          <span className='text-lg lg:text-xl'>
            {icon ? icon : <HiOutlineViewColumns />}
          </span>
          <span>{label}</span>
        </h3>
      </NavLink>
    </li>
  );
};

export default PageItem;
