import { useNavigate } from 'react-router-dom';
import Button from './Button';
import InputLocation from './InputLocation'
import { faLocationDot,faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

const RideLocationForm = () => {
    const navigate=useNavigate();
    const onClickfn=()=>{
        // check if user is logged in ?
        // if no
        const token=localStorage.getItem("token");
        if(token)
               navigate("/ride/confirm");

    else {
        navigate("/login");
    }
        //else
        // proceed to confirm the ride 

    }
  return (
    <div className='w-full flex flex-col justify-center items-center gap-3 mt-8'>
        <InputLocation  icon={faLocationDot} description="Enter Pickup location" />
         <InputLocation  icon={faLocationCrosshairs} description="Enter Drop location" />
      <Button
      onClick={onClickfn}
       label='Confirm the Ride'className='mt-8 w-[70%] rounded-lg p-8 text-2xl font-bold'/>
    </div>
  )
}

export default RideLocationForm
