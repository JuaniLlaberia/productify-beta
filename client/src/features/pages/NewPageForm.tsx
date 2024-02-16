import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import BtnsContainer from '../../components/BtnsContainer';
import InputWrapper from '../../components/InputWrapper';
import RadioGroup from '../../components/RadioGroup';
import { useCreatePage } from './useCreatePage';
import {
  columnTemplateType,
  productionTemplate,
  tasksTemplate,
} from '../../utils/variables/templates';

const NewPageForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPage, isLoading } = useCreatePage();

  const handleNewPage = handleSubmit(({ name, template }) => {
    let columnTemplate: columnTemplateType = [];

    switch (template) {
      case 'tasks':
        columnTemplate = tasksTemplate;
        break;
      case 'production':
        columnTemplate = productionTemplate;
        break;
      default:
        columnTemplate = [];
    }

    createPage(
      { name, columns: columnTemplate },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
      }
    );
  });

  return (
    <form onSubmit={handleNewPage}>
      <InputWrapper
        label='Board Page Name'
        errorMsg={errors?.name?.message as string}
      >
        <Input
          register={register('name', {
            required: 'Provide a board name',
          })}
          placeholder='e.g. Developers Tasks'
          type='text'
        />
      </InputWrapper>
      <InputWrapper
        label='Templates'
        errorMsg={errors?.template?.message as string}
      >
        <RadioGroup
          register={register('template', { required: 'Provide a board type' })}
          options={[
            { label: 'None', value: 'none' },
            { label: 'Tasks', value: 'tasks' },
            { label: 'Production', value: 'production' },
          ]}
        />
      </InputWrapper>
      <BtnsContainer>
        <Button
          disabled={isLoading}
          styleType='outline'
          onClick={e => {
            e.preventDefault();
            if (onClose) onClose();
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading}>Add board</Button>
      </BtnsContainer>
    </form>
  );
};

export default NewPageForm;
