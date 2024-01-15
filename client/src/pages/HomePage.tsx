import Navbar from '../components/Navbar';
import HomeTable from '../features/home/Home';

const HomePage = () => {
  return (
    <main className='flex min-h-screen w-full bg-bg-light-1 dark:bg-bg-dark-1'>
      <section className={`flex flex-col flex-1`}>
        <Navbar />
        <div
          className={`h-full w-full flex flex-col items-center pb-4 pt-2 px-6 lg:px-20`}
        >
          <HomeTable />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
