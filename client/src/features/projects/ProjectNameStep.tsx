import { HiOutlineFolder } from 'react-icons/hi2';

import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import { StepType } from '../../types/extraTypes';

const ProjectNameStep = ({ error, register }: StepType) => {
  return (
    <InputWrapper
      label='Name Your Project'
      errorMsg={error}
    >
      <Input
        register={register('projectName', {
          required: 'Provide a project name',
        })}
        icon={<HiOutlineFolder />}
        placeholder='Project Name'
      />
    </InputWrapper>
  );
};

export default ProjectNameStep;
