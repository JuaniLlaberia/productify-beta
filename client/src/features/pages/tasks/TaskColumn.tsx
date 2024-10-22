import Modal from '../../../components/Modal';
import ColumnBody from './ColumnBody';
import ColumnHeader from './ColumnHeader';
import NewEditTaskForm from './NewTaskForm';

import { ColorsType } from '../../../types/extraTypes';
import { PageTaskType } from '../../../types/pagesTypes';
import { Dialog, DialogContent } from '../../../components/Dialog';

type TaskColumnType = {
  id: string;
  label: string;
  color: ColorsType;
  tasks: PageTaskType[];
};

const TaskColumn = ({ label, color, tasks, id }: TaskColumnType) => {
  return (
    <Dialog>
      <li className='flex flex-col h-full w-full max-w-[425px]'>
        <section className='w-full sticky -top-5'>
          <div className='gap-6 bg-bg-light-1 dark:bg-bg-dark-1 flex justify-between py-3'>
            <ColumnHeader
              tasksLength={tasks.length}
              label={label}
              color={color}
              id={id}
            />
          </div>
        </section>

        <section className='flex gap-6 md:gap-2 2xl:gap-4 w-full h-full'>
          <ColumnBody
            tasks={tasks}
            id={id}
          />
        </section>
      </li>

      <DialogContent removeCloseBtn>
        <NewEditTaskForm status={label} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskColumn;
// import Modal from '../../../components/Modal';
// import ColumnBody from './ColumnBody';
// import ColumnHeader from './ColumnHeader';
// import NewEditTaskForm from './NewTaskForm';

// import { ColorsType } from '../../../types/extraTypes';
// import { PageTaskType } from '../../../types/pagesTypes';

// type TaskColumnType = {
//   id: string;
//   label: string;
//   color: ColorsType;
//   tasks: PageTaskType[];
// };

// const TaskColumn = ({ label, color, tasks, id }: TaskColumnType) => {
//   return (
//     <>
//       <li className='flex flex-col h-full w-full max-w-[425px]'>
//         <section className='w-full sticky -top-5'>
//           <div className='gap-6 bg-bg-light-1 dark:bg-bg-dark-1 flex justify-between py-3'>
//             <ColumnHeader
//               tasksLength={tasks.length}
//               label={label}
//               color={color}
//               id={id}
//             />
//           </div>
//         </section>

//         <section className='flex gap-6 md:gap-2 2xl:gap-4 w-full h-full'>
//           <ColumnBody
//             tasks={tasks}
//             id={id}
//           />
//         </section>
//       </li>

//       <Modal.Window
//         removeCloseBtn
//         windowId={`new-task-modal-${id}`}
//       >
//         <NewEditTaskForm status={label} />
//       </Modal.Window>
//     </>
//   );
// };

// export default TaskColumn;
