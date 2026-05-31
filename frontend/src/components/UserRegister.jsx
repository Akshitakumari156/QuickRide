import React from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '../validation/RegisterSchema'
import Button from './Button'

const UserRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const handleForm = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (response.status == 201) {
      navigate('/login')
    }
    if (response.status == 409) alert("user already exists  ");
    console.log(response);

    reset(); reset({}, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0b1e30] relative overflow-hidden py-12 px-4">
      {/* Premium background ambient mesh glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 md:p-10 flex flex-col gap-8 relative z-10">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20 mb-4">
            U
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Account
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">
            Sign up to start booking rides
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-5"
        >
          {/* Name Field Group - Row on Desktop / Stacked on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder='First name'
                {...register("firstname")}
                className={`w-full h-12 px-4 rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                  errors.firstname ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'
                }`}
              />
              {errors.firstname && (
                <p className="text-red-500 font-medium text-[11px] pl-1 mt-0.5">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1} ">
              <input
                type="text"
                placeholder="Last name"
                {...register('lastname')}
                className={`w-full h-12 px-4 rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                  errors.lastname ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'
                }`}
              />
              {errors.lastname && (
                <p className="text-red-500 font-medium text-[11px] pl-1 mt-0.5">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="saurav@gmail.com"
              {...register('email')}
              className={`w-full h-12 px-4 rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 font-medium text-[11px] pl-1 mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`w-full h-12 px-4 rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 font-medium text-[11px] pl-1 mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Form Actions Button */}
          <div className="mt-2">
            <Button 
              label={isSubmitting ? "Creating Account..." : "Confirm & Register"}
              bg="#2563eb"
              textColor="#FFFFFF"
              hoverbg="#1d4ed8"
              className="w-full h-12 rounded-xl font-semibold tracking-wide shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 font-medium border-t border-slate-100 pt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline ml-1 transition-colors"
          >
            Login
          </span>
        </div>

      </div>
    </div>
  )
}

export default UserRegister