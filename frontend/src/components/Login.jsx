import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const Signupfn=()=>{
    navigate('/signup')
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#F2F4F5]">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F2C46]">
            Welcome Back
          </h2>
          <p className="text-[#6C7A89] text-sm mt-1">
            Login to continue booking your ride
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <Button
            label="Login"
            bg="#2ECC71"
            textColor="#0F2C46"
            className="w-full h-12 font-semibold"
            hoverbg="#3ABEFF"
          />

          <button className="text-sm text-[#3ABEFF] hover:underline">
            Forgot password?
          </button>
        </div>

        {/* FOOTER */}
        <div className="text-center text-sm text-[#6C7A89]">
          Don’t have an account?{" "}
          <span
          onClick={Signupfn}
           className="text-[#3ABEFF] font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
