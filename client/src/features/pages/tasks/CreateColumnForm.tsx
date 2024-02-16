import { useForm } from 'react-hook-form';

import Input from '../../../components/Input';
import BtnsContainer from '../../../components/BtnsContainer';
import Button from '../../../components/Button';
import InputWrapper from '../../../components/InputWrapper';
import { useCreateColumn } from '../useCreateColumn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/Select';
import { colors } from '../../../utils/variables/colors';

const CreateColumnForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
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
      <InputWrapper
        htmlFor='column-label'
        label='Column Label'
        errorMsg={errors?.label?.message as string}
      >
        <Input
          type='text'
          id='column-label'
          register={register('label', { required: 'Provide a label' })}
          placeholder='e.g. To do'
        />
      </InputWrapper>
      <InputWrapper label='Column Color'>
        <Select
          required
          value={watch('color')}
          onValueChange={val => setValue('color', val)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a color' />
          </SelectTrigger>
          <SelectContent>
            {colors.map(color => (
              <SelectItem
                key={color}
                value={color}
                className='capitalize'
              >
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputWrapper>

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
