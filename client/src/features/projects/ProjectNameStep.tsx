import { HiOutlineFolder } from 'react-icons/hi2';

import Input from '../../components/Input';
import { StepType } from '../../types/extraTypes';

const ProjectNameStep = ({ error, register }: StepType) => {
  return (
    <Input
      register={register('projectName', {
        required: 'Provide a project name',
      })}
      label='Name Your Project'
      icon={<HiOutlineFolder />}
      placeholder='Project Name'
      errorMsg={error}
    />
  );
};

export default ProjectNameStep;
