import MembersRow from './MembersRow';
import { useProjectContext } from '../../context/ProjectContext';

const MembersTable = () => {
  const { isAdmin, projectData } = useProjectContext();

  return (
    <table className='w-full flex flex-col text-sm text-left rtl:text-right min-h-[300px] max-h-[450px] '>
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
      <tbody className='w-full lg:pr-2 block h-[400px] overflow-y-auto overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-scroll-light hover:lg:scrollbar-thumb-scroll-light-hover'>
        {projectData.members.map(member => (
          <MembersRow
            key={member._id}
            _id={member._id}
            name={`${member.firstName} ${member.lastName}`}
            email={member.email}
            authIsAdmin={isAdmin}
            isAdmin={projectData.admins.includes(member._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MembersTable;
