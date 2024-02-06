import { useForm } from 'react-hook-form';

import Input from '../../../components/Input';
import BtnsContainer from '../../../components/BtnsContainer';
import Button from '../../../components/Button';
import { useCreateColumn } from '../useCreateColumn';

const CreateColumnForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { addColumn, isLoading } = useCreateColumn();

  const handleCreateColumn = handleSubmit(({ label, color }) => {
    addColumn(
      { label, color },
      {
        onSuccess: () => onClose?.(),
      }
    );
  });

  return (
    <form onSubmit={handleCreateColumn}>
      <Input
        label='Column Label'
        register={register('label', { required: 'Provide a label' })}
        errorMsg={errors?.label?.message as string}
      />
      <Input
        label='Column Color'
        register={register('color', { required: 'Provide a color' })}
        errorMsg={errors?.color?.message as string}
      />
      <BtnsContainer>
        <Button
          disabled={isLoading}
          styleType='outline'
          onClick={e => {
            e.preventDefault();
            onClose?.();
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading}>Add</Button>
      </BtnsContainer>
    </form>
  );
};

export default CreateColumnForm;
