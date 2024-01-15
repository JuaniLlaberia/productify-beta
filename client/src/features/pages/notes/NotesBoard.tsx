import { HiOutlineDocumentText, HiOutlinePlus } from 'react-icons/hi2';

import Modal from '../../../components/Modal';
import NewNoteForm from './NewNoteForm';
import NotesList from './NotesList';
import { useGetPage } from '../useGetPage';

const NotesBoard = () => {
  const { pageInfo, isLoading } = useGetPage();

  if (isLoading) return <p>LOADING</p>;

  return (
    <>
      <header className='z-10 w-full flex items-center justify-between sticky -top-2 bg-bg-light-1 p-4'>
        <Modal>
          <h3 className='flex items-center gap-2'>
            <span className='text-2xl lg:text-3xl text-text-light-2'>
              <HiOutlineDocumentText />
            </span>
            <span className='text-xl xl:text-2xl font-semibold'>
              {pageInfo?.name}
            </span>
            <span className='mt-1 text-text-light-2 dark:text-text-dark-2'>
              {pageInfo?.content?.length}
            </span>
          </h3>
          <Modal.Open windowId='new-task-form'>
            <button className='fixed bottom-5 right-5 bg-bg-light-contrast p-3 rounded-xl text-text-dark-1 md:relative md:top-0 md:right-0 md:flex md:items-center md:gap-2 md:bg-transparent md:py-1 md:px-2 md:text-text-light-2 md:dark:text-text-dark-2 md:rounded-lg 2xl:text-lg md:hover:bg-bg-light-hover-2 dark:md:hover:bg-bg-dark-hover-2 transition-colors'>
              <span className='text-3xl md:text-2xl'>
                <HiOutlinePlus />
              </span>
              <span className='hidden md:block'>Add new note</span>
            </button>
          </Modal.Open>
          <Modal.Window
            removeCloseBtn
            windowId='new-task-form'
          >
            <NewNoteForm />
          </Modal.Window>
        </Modal>
      </header>

      <NotesList notes={pageInfo?.content} />
    </>
  );
};

export default NotesBoard;
