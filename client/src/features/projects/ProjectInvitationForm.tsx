import { KeyboardEvent, useState } from 'react';
import { HiOutlineExclamationTriangle, HiOutlineXMark } from 'react-icons/hi2';

import Button from '../../components/Button';
import { useInviteToProject } from './useInviteToProject';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectInvitationForm = ({ onClose }: { onClose?: () => void }) => {
  const { projectData } = useProjectContext();

  //States
  const [inputVal, setInputVal] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);

  const { inviteUsers, isLoading } = useInviteToProject();

  //Check and add email to state
  const addEmail = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputVal)) {
      setIsError(true);
      return;
    }

    setEmails(prev => [...prev, inputVal.toLowerCase()]);
    setInputVal('');
  };

  //Remove email from state by index
  const removeEmail = (emailIndex: number) => {
    const updatedEmails = emails.filter((_, i) => i !== emailIndex);
    setEmails(updatedEmails);
  };

  const handleSendInvitations = () => {
    if (emails.length === 0) return;

    inviteUsers(
      {
        emails,
        projectId: projectData._id,
        projectName: projectData.name,
      },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
      }
    );
  };

  return (
    <section>
      <label
        htmlFor='input'
        className='flex items-start flex-wrap gap-2 py-2 px-1 bg-transparent border border-border-light dark:border-border-dark rounded-lg'
      >
        <ul className='flex gap-2 flex-wrap w-full max-h-[250px] lg:max-h-[300px] overflow-y-auto overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'>
          {emails.map((email, i) => (
            <li
              key={i}
              className='flex items-center gap-2 px-2 py-0.5 text-text-dark-1 rounded-md bg-bg-light-contrast'
            >
              <span>{email}</span>
              <button
                className='md:hover:bg-bg-light-hover rounded-md'
                onClick={() => removeEmail(i)}
              >
                <HiOutlineXMark size={20} />
              </button>
            </li>
          ))}
          <li className='w-full'>
            <input
              id='input'
              className='w-full outline-none border-none px-1 bg-transparent'
              type='text'
              placeholder='Write email (Press enter to add it)'
              value={inputVal}
              onKeyUp={e => addEmail(e)}
              onChange={e => {
                setInputVal(e.target.value);
                if (isError) setIsError(false);
              }}
            />
          </li>
        </ul>
      </label>
      {isError ? (
        <p className='flex items-end gap-1.5 px-2 mt-2 py-2 rounded-md text-sm bg-[#ff260017] text-[#ff7b5b] border border-[#ff3c0071]'>
          <span>
            <HiOutlineExclamationTriangle size={19} />
          </span>
          Invalid email format
        </p>
      ) : null}
      <div className='flex justify-between mt-3'>
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
        <Button
          disabled={emails.length === 0}
          onClick={handleSendInvitations}
          isLoading={isLoading}
        >
          Send
        </Button>
      </div>
    </section>
  );
};

export default ProjectInvitationForm;
