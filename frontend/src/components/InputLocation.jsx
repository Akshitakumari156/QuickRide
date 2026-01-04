import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
const InputLocation = ({icon,description}) => {
  return (
    <div className=' w-full h-full flex flex-col justify-center items-center m-auto mt-16 gap-6'>
        <div className='w-[80%]  h-16 flex justify-center items-center relative'>
        <FontAwesomeIcon
          icon={icon || faLocationDot}
          className="absolute left-28 z-50 top-1/2 transform -translate-y-1/2 text-[#45574d] text-xl"
        />        <input 
      type="text"
      placeholder={`${description || "Enter pickup location"}`}
      className='w-[80%] h-16 absolute text-center rounded-lg border-2 border-gray-300 text-2xl'
       />
        </div>
    </div>
  )
}

export default InputLocation
