import { useGetPage } from '../pages/useGetPage';

const Content = () => {
  const { pageInfo, isLoading } = useGetPage();

  if (isLoading) return <h1>Loading</h1>;

  console.log(pageInfo);

  return <div className='h-full p-6 px-20'>Content</div>;
};

export default Content;
