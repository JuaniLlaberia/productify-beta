import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import RadioGroup from '../../components/RadioGroup';
import { useCreatePage } from './useCreatePage';

const NewPageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPage, isLoading } = useCreatePage();

  const handleNewPage = handleSubmit(({ name, pageType }) => {
    createPage({ name, pageType });
  });

  return (
    <form onSubmit={handleNewPage}>
      <Input
        register={register('name', {
          required: 'Provide a page name',
        })}
        label='Page Name'
        placeholder='e.g. Developers Tasks'
        errorMsg={errors?.name?.message as string}
      />
      <RadioGroup
        label='Page Type'
        options={[
          { label: 'Tasks', value: 'task' },
          { label: 'Notes', value: 'notes' },
        ]}
        register={register('pageType', {
          required: 'Must select a page type',
        })}
        errorMsg={errors?.pageType?.message as string}
      />
      <Button
        isLoading={isLoading}
        full
        rounded
      >
        Add page
      </Button>
    </form>
  );
};

export default NewPageForm;
