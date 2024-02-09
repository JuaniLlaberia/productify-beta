import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineEllipsisHorizontal,
  HiOutlineTrash,
} from 'react-icons/hi2';

import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useDeletePage } from './useDeletePage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/DropdownMenu';

type PageItemType = {
  icon?: ReactElement;
  label: string;
  link: string;
  onClose: () => void;
  noMenu?: boolean;
  pageId?: string;
};

const PageItem = ({
  icon,
  label,
  link,
  onClose,
  noMenu,
  pageId,
}: PageItemType) => {
  const { deletePage, isLoading } = useDeletePage();

  return (
    <li
      onClick={onClose}
      className='mb-1 group md:hover:bg-bg-dark-3 md:hover:rounded-md'
    >
      <NavLink
        to={link}
        id='page-item'
        className='flex items-center justify-between px-1 py-1.5 text-text-dark-1'
      >
        <h3 className='flex items-center gap-2 lg:gap-3'>
          <span className='text-lg lg:text-xl'>
            {icon ? icon : <HiOutlineClipboardDocumentList />}
          </span>
          <span>{label}</span>
        </h3>
        {!noMenu ? (
          <Modal>
            <DropdownMenu>
              <div className='flex items-center text-text-dark-2'>
                <DropdownMenuTrigger>
                  <HiOutlineEllipsisHorizontal size={22} />
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent>
                <Modal.Open windowId='delete-page'>
                  <DropdownMenuItem icon={<HiOutlineTrash />}>
                    Delete board
                  </DropdownMenuItem>
                </Modal.Open>
              </DropdownMenuContent>
            </DropdownMenu>

            <Modal.Window
              title='Delete Page'
              removeCloseBtn
              windowId='delete-page'
            >
              <ConfirmationModal
                action={() => deletePage({ pageId: pageId! })}
                isLoading={isLoading}
                message='All data related to this page will be deleted for ever.'
              />
            </Modal.Window>
          </Modal>
        ) : null}
      </NavLink>
    </li>
  );
};

export default PageItem;
