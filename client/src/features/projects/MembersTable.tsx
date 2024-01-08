import MembersRow from './MembersRow';
import { useProjectContext } from '../../context/ProjectContext';

const MembersTable = () => {
  const { isAdmin, projectData } = useProjectContext();

  return (
    <table className='w-full text-sm text-left rtl:text-right min-h-[300px]'>
      <thead className='text-xs border-b border-border-light dark:border-border-dark text-text-light-1 uppercase dark:text-text-dark-1'>
        <tr>
          <th
            scope='col'
            className='px-3 py-3'
          >
            User Information
          </th>
        </tr>
      </thead>
      <tbody className='w-full'>
        {projectData.members.map(member => (
          <MembersRow
            key={member._id}
            _id={member._id}
            name={member.fullName}
            email={member.email}
            isAdmin={isAdmin}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MembersTable;
