import Button from '../../components/Button';
import Modal from '../../components/Modal';
import NewPageForm from '../pages/NewPageForm';
import EventsPrev from './EventsPrev';
import BoardsList from './BoardsList';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectHomePage = () => {
  const { projectData } = useProjectContext();

  return (
    <Modal>
      <h1 className='w-full mb-4 font-semibold text-2xl text-text-light-1 dark:text-text-dark-1'>
        {projectData.name}
      </h1>
      <section className='lg:grid lg:grid-cols-2 lg:gap-10 w-full'>
        <div className='w-full'>
          <section className='w-full flex items-center justify-between mb-4'>
            <h2 className='font-semibold text-text-light-2 dark:text-text-dark-2'>
              All boards ({projectData.pages.length})
            </h2>
            <Modal.Open windowId='new-board'>
              <Button styleType='outline'>+ New board</Button>
            </Modal.Open>
          </section>
          <BoardsList boards={projectData.pages} />
        </div>

        <EventsPrev />
      </section>

      <Modal.Window title='Create board' removeCloseBtn windowId='new-board'>
        <NewPageForm />
      </Modal.Window>
    </Modal>
  );
};

export default ProjectHomePage;
