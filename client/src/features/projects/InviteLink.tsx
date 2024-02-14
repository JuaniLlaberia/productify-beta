import { HiOutlineSquare2Stack } from 'react-icons/hi2';

import Input from '../../components/Input';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useGetInvCode } from '../invitations/useGetInvCode';
import { useResetInvCode } from '../invitations/useResetInvCode';

const InviteLink = () => {
  const { invCode, isLoading } = useGetInvCode();
  const { resetInvitationCode } = useResetInvCode();

  if (isLoading) return <p>loading</p>;

  return (
    <section>
      <p className='text-sm text-text-light-2 dark:text-text-dark-2'>
        Use the secret link to invite new members to the project in a secure
        way. You can also{' '}
        <span>
          <button
            onClick={() => resetInvitationCode(invCode?.code!)}
            className='underline cursor-pointer md:hover:text-special-color transition-colors'
          >
            reset your link
          </button>
        </span>
      </p>
      <div className='flex items-center space-x-2 mt-4'>
        <div className='grid flex-1 gap-2'>
          <label
            htmlFor='link'
            className='sr-only'
          >
            Link
          </label>
          <Input
            id='link'
            readOnly
            value={`http://localhost:5173/project/join/${invCode?.code}`}
          />
        </div>
        <button
          className='p-2 bg-bg-light-contrast text-text-dark-1 dark:bg-bg-dark-contrast dark:text-text-light-1 rounded-lg'
          onClick={() =>
            copyToClipboard(
              `http://localhost:5173/project/join/${invCode?.code}`,
              'Link copied',
              'Fail to copy link'
            )
          }
        >
          <span className='sr-only'>Copy</span>
          <HiOutlineSquare2Stack size={20} />
        </button>
      </div>
    </section>
  );
};

export default InviteLink;
