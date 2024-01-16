import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';

import BtnMenu from '../../../components/ButtonMenu';
import Modal from '../../../components/Modal';

const NotesContextMenu = () => {
  return (
    <ul>
      <Modal.Open windowId='edit-note'>
        <BtnMenu.Button icon={<HiOutlinePencil />}>Edit note</BtnMenu.Button>
      </Modal.Open>
      <Modal.Open windowId='delete-note'>
        <BtnMenu.Button icon={<HiOutlineTrash />}>Delete note</BtnMenu.Button>
      </Modal.Open>
    </ul>
  );
};

export default NotesContextMenu;
