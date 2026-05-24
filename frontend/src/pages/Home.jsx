import CaptainCTASection from '../components/captain/CaptainCTASection'
import Header from '../components/Header/PublicHeader'
import HomeHeroSection from '../components/HomeHeroSection'
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