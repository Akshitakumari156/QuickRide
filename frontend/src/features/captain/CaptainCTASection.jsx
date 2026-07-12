import { useNavigate } from "react-router-dom"

const CaptainCTASection = () => {
    const navigate=useNavigate();
    const handleCTABtn=()=>{
        navigate('/captain/register');
    }
  return (
    <div className="w-[90%] m-auto mt-12">
      <div className="rounded-2xl bg-gradient-to-r from-black to-gray-800 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Are you a Captain?
          </h2>
          <p className="text-gray-300 max-w-xl text-base">
            Register as a captain and start earning on your own schedule. Simple onboarding, fair pricing, and 24/7 support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
          onClick={handleCTABtn}
           className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
            Register as Captain
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>

      </div>
    </div>
  )
}

export default CaptainCTASection