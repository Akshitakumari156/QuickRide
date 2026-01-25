import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const {login}=useAuth();
  const navigate=useNavigate();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const Signupfn=()=>{
    navigate('/signup')
  }
  const handleBtn=async(data)=>{
      const response=await fetch("http://localhost:5000/api/user/login",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
           body:JSON.stringify({email,password})

      });
      const res=await response.json();
       if(response.status==200){
      login(res.token,"user");
     
      alert("logged in success");
      setEmail("");
      setPassword("")
      console.log(response)
      navigate('/dashboard')
    }
    else  alert("failed in logged in ")

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
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)}
            }
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]"
          />

          <input
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <Button
          onClick={handleBtn}
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
