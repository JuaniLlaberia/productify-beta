import {
  HiOutlineLockClosed,
  HiOutlinePuzzlePiece,
  HiOutlineTrash,
  HiOutlineUser,
} from 'react-icons/hi2';

import Modal from '../../components/Modal';
import DeleteUserModal from '../user/DeleteUserModal';
import SettingsItem from './SettingsItem';

export const SettingSidebar = () => {
  return (
    <aside className='sticky top-0 bg-bg-light-2 rounded-lg border border-light min-w-[210px] max-h-[190px] overflow-hidden'>
      <nav>
        <ul className='flex flex-col gap-1 p-2 py-4 shadow-sm'>
          <SettingsItem
            link='/settings/user'
            label='User Information'
            icon={<HiOutlineUser />}
          />
          <SettingsItem
            link='/settings/password'
            label='Manage Password'
            icon={<HiOutlineLockClosed />}
          />
          <SettingsItem
            link='/settings/appearance'
            label='Appearance'
            icon={<HiOutlinePuzzlePiece />}
          />
          <Modal>
            <li className='rounded-lg hover:bg-bg-light-hover-2 transition-colors'>
              <Modal.Open windowId='delete-account'>
                <button className='flex items-center gap-2 px-3 pl-4  py-1.5  text-red-400'>
                  <span className='text-lg'>
                    <HiOutlineTrash />
                  </span>
                  Delete Account
                </button>
              </Modal.Open>
            </li>
            <Modal.Window
              title='Delete Account'
              removeCloseBtn
              windowId='delete-account'
            >
              <DeleteUserModal />
            </Modal.Window>
          </Modal>
        </ul>
      </nav>
    </aside>
  );
};
