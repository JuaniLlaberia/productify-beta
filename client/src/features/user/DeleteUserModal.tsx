import ConfirmationModal from '../../components/ConfirmationModal';
import { useDeleteUser } from './useDeleteUser';

const DeleteUserModal = ({ onClose }: { onClose?: () => void }) => {
  const { deleteMe, isLoading } = useDeleteUser();

  return (
    <ConfirmationModal
      onClose={onClose}
      message='You are about to delete your account. All data belonging to this user will be lost.'
      action={deleteMe}
      isLoading={isLoading}
    />
  );
};

export default DeleteUserModal;
