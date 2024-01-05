import { HiOutlineFolder } from 'react-icons/hi2';
import Input from '../../components/Input';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type StepType = {
  nameError: string;
  register: UseFormRegister<FieldValues>;
};

const ProjectNameStep = ({ nameError, register }: StepType) => {
  console.log(nameError);

  return (
    <>
      <p className='text-text-light-2 mb-4'>
        Let's start by naming your new project.
      </p>
      <Input
        register={register('projectName', {
          required: 'Provide a project name',
        })}
        label='Name Your Project'
        icon={<HiOutlineFolder />}
        placeholder='Project Name'
        errorMsg={nameError}
      />
    </>
  );
};

export default ProjectNameStep;
