import { HiOutlineTrash } from 'react-icons/hi2';

import BtnMenu from '../../components/ButtonMenu';
import Modal from '../../components/Modal';

const PageItemsContextMenu = () => {
  return (
    <ul>
      <Modal.Open windowId='delete-page'>
        <BtnMenu.Button icon={<HiOutlineTrash />}>Delete page</BtnMenu.Button>
      </Modal.Open>
    </ul>
  );
};

export default PageItemsContextMenu;
