import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';

import { PageTaskType } from '../../../types/pagesTypes';
import { useCreateTask } from '../useCreateTask';
import { DropdownMenuItem } from '../../../components/DropdownMenu';
import { ContextMenuItem } from '../../../components/ContextMenu';

const DuplicateBtn = ({
  taskInfo,
  mobile,
}: {
  taskInfo: PageTaskType;
  mobile?: boolean;
}) => {
  const { addTask } = useCreateTask();

  const handleCreteDuplicate = () => {
    addTask({ ...taskInfo, _id: undefined });
  };

  if (mobile)
    return (
      <DropdownMenuItem
        icon={<HiOutlineDocumentDuplicate />}
        onClick={handleCreteDuplicate}
      >
        Duplicate
      </DropdownMenuItem>
    );

  return (
    <ContextMenuItem
      icon={<HiOutlineDocumentDuplicate />}
      onClick={handleCreteDuplicate}
    >
      Duplicate
    </ContextMenuItem>
  );
};

export default DuplicateBtn;
