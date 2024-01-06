import Layout from '../components/AppLayout';
import HomeTable from '../features/home/Home';

const HomePage = () => {
  return (
    <Layout>
      <Layout.Content includeLogo>
        <HomeTable />
      </Layout.Content>
    </Layout>
  );
};

export default HomePage;
