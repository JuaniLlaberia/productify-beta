import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

import Button from '../../components/Button';
import ChatMembersList from './ChatMembersList';
import ChatInfoField from './ChatInfoField';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { useProjectContext } from '../../context/ProjectContext';
import { useUserContext } from '../../context/UserContext';
import { useCreateProjChat } from './useCreateProjChat';

const NewChatForm = ({ onClose }: { onClose: () => void }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      members: selectedUsers,
    },
  });

  const { user } = useUserContext();
  const { projectData } = useProjectContext();
  const { createChat, isLoading } = useCreateProjChat();

  const updateSelectedUsers = (users: string[]) => {
    setSelectedUsers(users);
    setValue('members', users);
  };

  const { crrStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useMultiStepForm([
      <ChatMembersList
        members={projectData.members.filter(
          member => member._id !== user?.data?._id
        )}
        updateUsers={updateSelectedUsers}
        selectedUsers={selectedUsers}
      />,
      <ChatInfoField
        register={register}
        error={errors?.name?.message as string}
      />,
    ]);

  const handleNewPage = handleSubmit(({ name, members }) => {
    if (!minSelection) return;
    if (!isLastStep) return nextStep();

    createChat(
      { name, members },
      {
        onSuccess: () => onClose(),
      }
    );
  });

  const minSelection = selectedUsers.length >= 2;

  return (
    <form onSubmit={handleNewPage}>
      {crrStep}
      <footer className='flex flex-col gap-2'>
        <Button
          isLoading={isLoading}
          full
          rounded
        >
          {!isLastStep ? 'Next' : 'Create'}
        </Button>

        {!isFirstStep ? (
          <button
            disabled={isLoading}
            className='flex items-center gap-2 justify-center text-text-light-2 dark:text-text-dark-2 md:hover:underline'
            onClick={prevStep}
          >
            <HiOutlineArrowLeft /> Previous
          </button>
        ) : null}
      </footer>
    </form>
  );
};

export default NewChatForm;
