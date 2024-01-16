import NoteCard from './NoteCard';

export type NoteType = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
};

const NotesList = ({ notes }: { notes: NoteType[] }) => {
  if (notes.length === 0)
    return (
      <p className='text-text-light-2 dark:text-text-dark-2'>
        There are no notes yet. Start creating one.
      </p>
    );

  return (
    <ul className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-4'>
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
        />
      ))}
    </ul>
  );
};

export default NotesList;
