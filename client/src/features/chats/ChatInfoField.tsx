import Input from '../../components/Input';
import { StepType } from '../../types/extraTypes';

const ChatInfoField = ({ register, error }: StepType) => {
  return (
    <Input
      register={register('name', {
        required: 'Provide a chat name',
      })}
      label='Page Name'
      placeholder='e.g. Front-End Team'
      errorMsg={error}
    />
  );
};

export default ChatInfoField;
