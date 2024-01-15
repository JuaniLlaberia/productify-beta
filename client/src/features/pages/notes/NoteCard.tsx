import Tiptap from '../../../components/Tiptap';
import BtnMenu from '../../../components/ButtonMenu';
import Modal from '../../../components/Modal';
import NewNoteForm from './NewNoteForm';
import ConfirmationModal from '../../../components/ConfirmationModal';
import NotesContextMenu from './NotesContextMenu';
import { formatDateDistance } from '../../../utils/formatDateDistance';
import { NoteType } from './NotesList';
import { useDeleteContent } from '../useDeleteContent';

const NoteCard = ({ note }: { note: NoteType }) => {
  const { deleteContent, isLoading } = useDeleteContent();

  return (
    <li className='before:bg-special-color before:h-full before:w-1.5 before:absolute before:left-0 before:top-0 overflow-hidden relative group cursor-pointer w-full px-3 pl-4 bg-bg-light-3 dark:bg-bg-dark-3 border border-light dark:border-dark p-2 rounded-lg shadow-sm lg:max-w-[450px]'>
      <BtnMenu>
        <div className='flex justify-between items-center pb-1'>
          <p className='text-sm text-text-light-2 py-1.5'>
            {formatDateDistance(new Date(note.createdAt))}
          </p>
          <div className='md:hidden md:group-hover:block'>
            <BtnMenu.Toggle menuId='note-context-menu' />
          </div>
        </div>
        <h3 className='text-lg font-semibold'>{note.title}</h3>
        <Tiptap
          isReadOnly
          content={note.content}
        />
        <Modal>
          <BtnMenu.Menu menuId='note-context-menu'>
            <NotesContextMenu />
          </BtnMenu.Menu>
          {/* Modal windows*/}
          <Modal.Window
            removeCloseBtn
            windowId='edit-note'
          >
            <NewNoteForm defaultData={note} />
          </Modal.Window>
          <Modal.Window
            removeCloseBtn
            title='Delete Note'
            windowId='delete-note'
          >
            <ConfirmationModal
              action={() => deleteContent({ contentId: note._id })}
              message={`You are about to delete a note and it's data.`}
              isLoading={isLoading}
            />
          </Modal.Window>
        </Modal>
      </BtnMenu>
    </li>
  );
};

export default NoteCard;
