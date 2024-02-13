import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import { StepType } from '../../types/extraTypes';

const ChatInfoField = ({ register, error }: StepType) => {
  return (
    <InputWrapper
      label='Chat Name'
      errorMsg={error}
    >
      <Input
        type='text'
        register={register('name', {
          required: 'Provide a chat name',
        })}
        placeholder='e.g. Front-End Team'
      />
    </InputWrapper>
  );
};

export default ChatInfoField;
