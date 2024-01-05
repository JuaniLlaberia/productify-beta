import Layout from '../components/AppLayout';
import HomeTable from '../features/home/Home';

const HomePage = () => {
  return (
    <Layout>
      <Layout.Content>
        <HomeTable />
      </Layout.Content>
    </Layout>
  );
};

export default HomePage;
