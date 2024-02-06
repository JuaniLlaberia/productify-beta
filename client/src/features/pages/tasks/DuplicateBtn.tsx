import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';

import BtnMenu from '../../../components/ButtonMenu';
import { PageTaskType } from '../../../types/pagesTypes';
import { useCreateTask } from '../useCreateTask';

const DuplicateBtn = ({ taskInfo }: { taskInfo: PageTaskType }) => {
  const { addTask } = useCreateTask();

  const handleCreteDuplicate = () => {
    addTask({ ...taskInfo, _id: undefined });
  };

  return (
    <BtnMenu.Button
      icon={<HiOutlineDocumentDuplicate />}
      onClick={handleCreteDuplicate}
    >
      Duplicate
    </BtnMenu.Button>
  );
};

export default DuplicateBtn;
