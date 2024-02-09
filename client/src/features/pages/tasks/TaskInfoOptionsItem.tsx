import type { ReactElement } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';

type TaskInfoOptItemsType = {
  label: string;
  icon: ReactElement;
  value: string;
  onChangeFn: (val: string) => void;
  options: string[];
};

const TaskInfoOptionsItem = ({
  label,
  icon,
  value,
  onChangeFn,
  options,
}: TaskInfoOptItemsType) => {
  return (
    <li className='flex w-full justify-between'>
      <label className='flex items-center gap-1 text-text-light-2'>
        {icon}
        <span>{label}</span>
      </label>

      <div>
        <Select
          value={value}
          onValueChange={onChangeFn}
        >
          <SelectTrigger className='border-none shadow-none bg-transparent gap-6'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((item, index) => (
              <SelectItem
                key={index}
                value={item}
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </li>
  );
};

export default TaskInfoOptionsItem;
