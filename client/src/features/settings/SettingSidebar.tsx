import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineLockClosed,
  HiOutlinePuzzlePiece,
  HiOutlineShieldExclamation,
  HiOutlineTrash,
  HiOutlineUser,
} from 'react-icons/hi2';

import Modal from '../../components/Modal';
import DeleteUserModal from '../user/DeleteUserModal';
import SettingsItem from './SettingsItem';
import { useLogout } from '../authentication/useLogout';

export const SettingSidebar = () => {
  const { logout } = useLogout();

  return (
    <aside className='w-full lg:w-auto min-w-[225px] sticky lg:relative px-3'>
      <nav>
        <h3 className='my-2 text-sm font-semibold text-text-light-2 dark:text-text-dark-2'>
          General
        </h3>
        <ul className='flex flex-col gap-1'>
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
        </ul>
        <h3 className='my-2 text-sm font-semibold text-text-light-2 dark:text-text-dark-2'>
          More Options
        </h3>
        <ul className='flex flex-col gap-1'>
          <SettingsItem
            link='/settings/support'
            label='Support & Help'
            icon={<HiOutlineShieldExclamation />}
          />
          <SettingsItem
            label='Log Out'
            fn={logout}
            icon={<HiOutlineArrowRightOnRectangle />}
          />
          <Modal>
            <Modal.Open windowId='delete-account'>
              <li className='rounded-lg hover:bg-bg-light-hover-2 transition-colors'>
                <button className='flex items-center gap-2 px-3 pl-4  py-1.5  text-red-400 dark:text-red-500'>
                  <span className='text-lg'>
                    <HiOutlineTrash />
                  </span>
                  Delete Account
                </button>
              </li>
            </Modal.Open>
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
