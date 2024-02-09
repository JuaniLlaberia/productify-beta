import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';
import BtnsContainer from '../../components/BtnsContainer';
import InputWrapper from '../../components/InputWrapper';
import { useCreatePage } from './useCreatePage';

const NewPageForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPage, isLoading } = useCreatePage();

  const handleNewPage = handleSubmit(({ name }) => {
    createPage(
      { name },
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
            required: 'Provide a page name',
          })}
          placeholder='e.g. Developers Tasks'
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
