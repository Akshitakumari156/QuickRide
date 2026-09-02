import React, { useState } from "react";
import Button from "../../common/Button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/authService";
import { useToast } from "../../common/Toast/ToastContext";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Signupfn = () => {
    navigate("/register");
  };

  const handleBtn = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await loginUser(email, password);

      login(data.token, "user");

      toast.success("Welcome back — redirecting you now.", "Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to log in";
      console.error("Login handler operation crashed:", error);
      toast.error(
        error.response
          ? message
          : "Network error. Please confirm your backend service is running.",
        "Couldn't log you in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#060a12] text-white relative overflow-hidden px-4 py-12">
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
            Welcome Back
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Sign in to your QuickRide rider account
          </p>
        </div>

        <form onSubmit={handleBtn} className="flex flex-col gap-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-sm">
                  <FiMail />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-sm">
                  <FiLock />
                </div>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <Button
              type="submit"
              label={loading ? "Signing in..." : "Sign In to QuickRide"}
              loading={loading}
              bg="#2563eb"
              textColor="#FFFFFF"
              hoverbg="#1d4ed8"
              className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-600/30 text-sm cursor-pointer"
            />
          </div>
        </form>

        <div className="text-center text-xs text-slate-400 font-medium border-t border-white/10 pt-5">
          Don't have an account?{" "}
          <button
            onClick={Signupfn}
            type="button"
            className="text-blue-400 font-bold hover:text-blue-300 hover:underline ml-1 cursor-pointer transition-colors"
          >
            Create Rider Account
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Are you a driver?{" "}
          <Link
            to="/captain/login"
            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
          >
            Sign In as Captain →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
