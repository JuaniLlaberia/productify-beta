import PageItem from './PageItem';
import { PageType } from '../../types/pagesTypes';

type PageListType = {
  title: string;
  pages: PageType[];
  onClose: () => void;
};

const PagestList = ({ title, pages, onClose }: PageListType) => {
  return (
    <>
      <h2 className='uppercase text-xs font-semibold text-text-dark-2 mb-2 px-2'>
        {title}
      </h2>
      {pages.length > 0 ? (
        <ul className='px-2'>
          {pages.map(page => (
            <PageItem
              onClose={onClose}
              key={page._id}
              label={page.name}
              pageId={page._id as string}
              link={`${page._id}`}
            />
          ))}
        </ul>
      ) : (
        <p className='px-3 text-sm text-text-dark-2 opacity-60'>No boards</p>
      )}
    </>
  );
};

export default PagestList;
