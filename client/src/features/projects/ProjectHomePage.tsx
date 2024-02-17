import { HiOutlinePlus } from 'react-icons/hi2';

import Modal from '../../components/Modal';
import NewPageForm from '../pages/NewPageForm';
import BoardsList from './BoardsList';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectHomePage = () => {
  const { projectData } = useProjectContext();

  return (
    <Modal>
      <h1 className='w-full mb-4 lg:mb-6 font-semibold text-2xl text-text-light-1 dark:text-text-dark-1'>
        Project overview
      </h1>
      <section className='w-full mb-6'>
        <section className='w-full flex items-center justify-between mb-4'>
          <h2 className='font-semibold text-text-light-2 dark:text-text-dark-2 lg:text-lg xl:text-xl'>
            All boards
          </h2>
          <Modal.Open windowId='new-board'>
            <button className='fixed bottom-5 right-5 bg-bg-light-contrast p-3 rounded-xl text-text-dark-1 md:relative md:top-0 md:right-0 md:flex md:items-center md:gap-2 md:bg-transparent md:py-1 md:px-2 md:text-text-light-2 md:dark:text-text-dark-2 md:rounded-lg 2xl:text-lg md:hover:bg-bg-light-hover-2 dark:md:hover:bg-bg-dark-hover-2 transition-colors'>
              <span className='text-3xl md:text-2xl'>
                <HiOutlinePlus />
              </span>
              <span className='hidden md:block'>New board</span>
            </button>
          </Modal.Open>
        </section>
        <BoardsList boards={projectData.pages} />
      </section>
      <Modal.Window
        title='Create board'
        removeCloseBtn
        windowId='new-board'
      >
        <NewPageForm />
      </Modal.Window>
    </Modal>
  );
};

export default ProjectHomePage;
