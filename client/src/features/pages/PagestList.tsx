import PageItem from './PageItem';

type PageListType = {
  title: string;
  pages: {
    _id: string;
    name: string;
    pageType: 'task' | 'notes';
  }[];
};

const PagestList = ({ title, pages }: PageListType) => {
  return (
    <>
      <h2 className='uppercase text-xs font-semibold text-text-dark-2 px-2 mb-2'>
        {title}
      </h2>
      {pages.length > 0 ? (
        <ul className='px-2'>
          {pages.map(page => (
            <PageItem
              key={page._id}
              label={page.name}
              taskType={page.pageType}
              link={`${page.pageType}/${page._id}`}
            />
          ))}
        </ul>
      ) : (
        <p className='px-3 text-sm text-text-dark-2 opacity-60'>
          No pages found
        </p>
      )}
    </>
  );
};

export default PagestList;
