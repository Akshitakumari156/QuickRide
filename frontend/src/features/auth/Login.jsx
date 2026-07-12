import React, { useState } from "react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/authService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Signupfn = () => {
    navigate("/register");
  };

  const handleBtn = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    try {
      const { data } = await loginUser(email, password);

      login(data.token, "user");

      alert("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to log in";
      console.error("Login handler operation crashed:", error);
      alert(
        error.response
          ? message
          : "Network error. Please confirm your backend service is running."
      );
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0b1e30] relative overflow-hidden px-4">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 md:p-10 flex flex-col gap-8 relative z-10 transform transition-all">
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20 mb-4">
            U
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 text-sm mt-1.5 font-medium">
            Login to continue booking your ride
          </p>
        </div>

        <form onSubmit={handleBtn} className="flex flex-col gap-5">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Button
              type="submit"
              label="Login"
              bg="#2563eb"
              textColor="#FFFFFF"
              hoverbg="#1d4ed8"
              className="w-full h-12 rounded-xl font-semibold tracking-wide shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            />

            <button
              type="button"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors self-center py-1"
            >
              Forgot password?
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-500 font-medium border-t border-slate-100 pt-6">
          Don’t have an account?{" "}
          <span
            onClick={Signupfn}
            className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline ml-1 transition-colors"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;