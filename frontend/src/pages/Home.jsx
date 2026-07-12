import CaptainCTASection from '../features/captain/CaptainCTASection'
import Header from '../common/Header/PublicHeader'
import HomeHeroSection from '../features/home/HomeHeroSection'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuth } = useAuth();

  return (
    <div className='bg-[#F2F4F5] w-full h-full'>
      {!isAuth && <CaptainCTASection />}

      <HomeHeroSection />
    </div>
  );
};

export default Home;