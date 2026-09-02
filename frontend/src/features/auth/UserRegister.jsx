import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/RegisterSchema";
import Button from "../../common/Button";
import { registerUser } from "../../api/authService";
import { useToast } from "../../common/Toast/ToastContext";
import { FiUser, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

const UserRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleForm = async (data) => {
    try {
      await registerUser(data);
      toast.success("You're all set — please log in to continue.", "Account created");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("An account with this email already exists.", "Registration failed");
      } else if (error.response) {
        toast.error("Please check your details and try again.", "Registration failed");
      } else {
        console.error("Registration runtime operation exception:", error);
        toast.error(
          "Please make sure your server stack is online.",
          "Network error"
        );
      }
    } finally {
      reset(
        {},
        {
          keepErrors: false,
          keepDirty: false,
          keepTouched: false,
        }
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#060a12] text-white relative overflow-hidden py-12 px-4">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-white/10 px-4 py-2 rounded-full transition-all cursor-pointer backdrop-blur-md"
      >
        <FiArrowLeft /> Back to Home
      </button>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/80 border border-white/15 p-8 md:p-10 flex flex-col gap-7 relative z-10 animate-[toast-in_0.3s_ease-out]">
        <div className="text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-500/25 border border-white/20 mb-4">
            Q
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
            Create Account
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Sign up to start booking instant rides across the city
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                {...register("firstname")}
                className={`w-full h-11 px-3.5 rounded-xl border bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors.firstname
                    ? "border-rose-500/80"
                    : "border-white/10"
                }`}
              />

              {errors.firstname && (
                <p className="text-rose-400 font-medium text-[11px] pl-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastname")}
                className={`w-full h-11 px-3.5 rounded-xl border bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors.lastname
                    ? "border-rose-500/80"
                    : "border-white/10"
                }`}
              />

              {errors.lastname && (
                <p className="text-rose-400 font-medium text-[11px] pl-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="text"
              placeholder="name@example.com"
              {...register("email")}
              className={`w-full h-11 px-3.5 rounded-xl border bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                errors.email
                  ? "border-rose-500/80"
                  : "border-white/10"
              }`}
            />

            {errors.email && (
              <p className="text-rose-400 font-medium text-[11px] pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full h-11 px-3.5 rounded-xl border bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                errors.password
                  ? "border-rose-500/80"
                  : "border-white/10"
              }`}
            />

            {errors.password && (
              <p className="text-rose-400 font-medium text-[11px] pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <Button
              type="submit"
              label={
                isSubmitting
                  ? "Creating Account..."
                  : "Register as Rider"
              }
              loading={isSubmitting}
              bg="#2563eb"
              textColor="#FFFFFF"
              hoverbg="#1d4ed8"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-600/30 text-sm cursor-pointer"
            />
          </div>
        </form>

        <div className="text-center text-xs text-slate-400 font-medium border-t border-white/10 pt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 font-bold hover:text-blue-300 hover:underline ml-1 cursor-pointer transition-colors"
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
