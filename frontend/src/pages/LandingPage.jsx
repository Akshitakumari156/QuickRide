import { useAuth } from "../context/AuthContext"
import HeroSection from "../features/landing/HeroSection"
import ServicesPreview from "../features/landing/ServicesPreview"
import HowItWorks from "../features/landing/HowItWorks"
import WhyQuickRide from "../features/landing/WhyQuickRide"
import CaptainCTASection from "../features/captain/CaptainCTASection"

const LandingPage = () => {
  const { isAuth } = useAuth()

  return (
    <div className="w-full">
      <HeroSection />
      <ServicesPreview />
      <HowItWorks />
      <WhyQuickRide />
      {!isAuth && <CaptainCTASection />}
    </div>
  )
}

export default LandingPage
