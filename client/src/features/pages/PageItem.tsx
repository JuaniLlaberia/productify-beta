import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
} from 'react-icons/hi2';

import BtnMenu from '../../components/ButtonMenu';
import PageItemsContextMenu from './PageItemsContextMenu';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useDeletePage } from './useDeletePage';

type PageItemType = {
  icon?: ReactElement;
  label: string;
  link: string;
  taskType?: 'task' | 'notes';
  onClose: () => void;
  noMenu?: boolean;
  pageId: string;
};

const PageItem = ({
  icon,
  label,
  link,
  taskType,
  onClose,
  noMenu,
  pageId,
}: PageItemType) => {
  const { deletePage, isLoading } = useDeletePage();

  return (
    <li
      onClick={onClose}
      className='group md:hover:bg-bg-dark-3 md:hover:rounded-md'
    >
      <NavLink
        to={link}
        id='page-item'
        className='flex items-center justify-between px-1 py-1.5 text-text-dark-1'
      >
        <h3 className='flex items-center gap-2 lg:gap-3'>
          <span className='text-lg lg:text-xl'>
            {icon ? (
              icon
            ) : taskType === 'task' ? (
              <HiOutlineClipboardDocumentList />
            ) : (
              <HiOutlineDocumentText />
            )}
          </span>
          <span className='2xl:text-lg'>{label}</span>
        </h3>
        {!noMenu ? (
          <Modal>
            <BtnMenu>
              <div className='md:hidden md:group-hover:flex md:group-hover:items-center'>
                <BtnMenu.Toggle menuId='page-items-menu' />
              </div>
              <BtnMenu.Menu menuId='page-items-menu'>
                <PageItemsContextMenu />
              </BtnMenu.Menu>
            </BtnMenu>
            <Modal.Window
              title='Delete Page'
              removeCloseBtn
              windowId='delete-page'
            >
              <ConfirmationModal
                action={() => deletePage({ pageId })}
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
