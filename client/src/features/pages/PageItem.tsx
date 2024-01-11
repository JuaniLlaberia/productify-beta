import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
} from 'react-icons/hi2';

type PageItemType = {
  icon?: ReactElement;
  label: string;
  link: string;
  taskType?: 'task' | 'notes';
};

const PageItem = ({ icon, label, link, taskType }: PageItemType) => {
  return (
    <li>
      <NavLink
        to={link}
        id='page-item'
        className='flex items-center justify-between px-1 py-1.5 text-text-dark-1'
      >
        <h3 className='flex items-center gap-2 lg:gap-3'>
          <span className='text-lg lg:text-2xl'>
            {icon ? (
              icon
            ) : taskType === 'task' ? (
              <HiOutlineClipboardDocumentList />
            ) : (
              <HiOutlineDocumentText />
            )}
          </span>
          <span className='lg:text-lg'>{label}</span>
        </h3>
      </NavLink>
    </li>
  );
};

export default PageItem;
