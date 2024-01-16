import { useForm } from 'react-hook-form';

import Button from '../../../components/Button';
import Tiptap from '../../../components/Tiptap';
import BtnsContainer from '../../../components/BtnsContainer';
import { PageContentType } from '../../../types/pagesTypes';
import { useCreateContent } from '../useCreateContent';
import { useUpdateContent } from '../useUpdateContent';

type NotesFormType = {
  defaultData?: PageContentType;
  onClose?: () => void;
};

const NewNoteForm = ({ defaultData, onClose }: NotesFormType) => {
  const isEditMode = Boolean(defaultData?._id);

  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: isEditMode ? defaultData : {},
  });

  const { addContent, isLoading } = useCreateContent();
  const { editContent, isLoading: isEditing } = useUpdateContent();

  const handleCreateNote = handleSubmit(({ title, content }) => {
    if (!isEditMode) {
      addContent(
        { title, content },
        {
          onSuccess: () => {
            if (onClose) onClose();
          },
        }
      );
    } else {
      editContent(
        { content: { ...defaultData, title, content } },
        {
          onSuccess: () => {
            if (onClose) onClose();
          },
        }
      );
    }
  });

  return (
    <form
      onSubmit={handleCreateNote}
      className='px-2'
    >
      <input
        disabled={isLoading || isEditing}
        {...register('title', { required: 'Notes need to have a title' })}
        className='bg-transparent font-semibold text-xl xl:text-5xl w-full border-none outline-none placeholder:text-text-light-2 placeholder:opacity-80'
        placeholder='Untitled'
      />
      <Tiptap
        content={watch('content') || ''}
        handleContent={(content: string) => setValue('content', content)}
      />
      <BtnsContainer>
        <Button
          disabled={isLoading || isEditing}
          styleType='outline'
          onClick={e => {
            e.preventDefault();
            if (onClose) onClose();
          }}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading || isEditing}>Add</Button>
      </BtnsContainer>
    </form>
  );
};

export default NewNoteForm;
