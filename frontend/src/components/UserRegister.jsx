import React from 'react'
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '../validation/RegisterSchema'
import Button from './Button'
import { json } from 'zod'
const UserRegister = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors, isSubmitting
    },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const handleForm = async (data) => {
    console.log(data);
    const response=await fetch("http://localhost:5000/api/user/register",{
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    });
    if(response.status==201){
      navigate('/login')
    }
     if(response.status==409)alert("user already exists  ");
    console.log(response);

    reset();  reset({}, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#F2F4F5]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        {/* header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F2C46]">
            Create Account
          </h2>
          <p className="text-[#6C7A89] text-sm mt-1">
            Sign up to start booking rides
          </p>
        </div>
        {/* header ends */}

        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="text"
              placeholder='First name'
              {...register("firstname")}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3ABEFF]"
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              {...register('lastname')}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3ABEFF]"
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="saurav@gmail.com"
              {...register('email')}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3ABEFF]"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3ABEFF]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button 
          label={isSubmitting?"Submitting...":"Confirm"}
          className='m-auto rounded-md p-1 font-semibold w-64'
          
          />


        </form>

      </div>


    </div>
  )
}

export default UserRegister
