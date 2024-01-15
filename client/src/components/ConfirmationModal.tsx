import type { MouseEvent } from 'react';
import Button from './Button';
import AlertCard from './AlertCard';
import BtnsContainer from './BtnsContainer';

type ConfModalType = {
  action: () => void;
  message: string;
  onClose?: () => void;
  isLoading?: boolean;
};

const ConfirmationModal = ({
  action,
  message,
  onClose,
  isLoading,
}: ConfModalType) => {
  const handleAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    action();
    if (onClose && !isLoading) onClose();
  };

  return (
    <>
      <p className='text-text-light-2 dark:text-text-dark-2'>{message}</p>
      <section className='my-4 md:px-4'>
        <AlertCard message='This action is not reversible.' />
      </section>
      <BtnsContainer>
        <Button
          disabled={isLoading}
          styleType='outline'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleAction}
        >
          Confirm
        </Button>
      </BtnsContainer>
    </>
  );
};

export default ConfirmationModal;
