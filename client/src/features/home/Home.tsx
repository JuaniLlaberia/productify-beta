import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import ProjectsTable from '../projects/ProjectsTable';
import Modal from '../../components/Modal';
import ProjectsForm from '../projects/ProjectsForm';

const HomeTable = () => {
  return (
    <section className='flex flex-col'>
      <header className='flex justify-between items-center mb-6'>
        <Modal>
          <h1 className='text-2xl font-semibold'>Your Projects</h1>
          <Modal.Open windowId='new-project-modal'>
            <Button styleType='outline'>New project</Button>
          </Modal.Open>
          <Modal.Window windowId='new-project-modal'>
            <ProjectsForm />
          </Modal.Window>
        </Modal>
      </header>
      <ProjectsTable />
      <p className='absolute bottom-3 text-text-light-2'>
        Problems finding your project?{' '}
        <Link to='/home' className='hover:underline'>
          Click here
        </Link>
      </p>
    </section>
  );
};

export default HomeTable;
