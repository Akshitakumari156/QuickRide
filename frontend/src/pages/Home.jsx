import CaptainCTASection from '../features/captain/CaptainCTASection'
import Header from '../common/Header/PublicHeader'
import HomeHeroSection from '../features/home/HomeHeroSection'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuth } = useAuth();

  return (
    <div className='bg-[#060a12] text-white w-full min-h-screen'>
      {!isAuth && <CaptainCTASection />}
      <HomeHeroSection />
    </div>
  );
};

export default Home;