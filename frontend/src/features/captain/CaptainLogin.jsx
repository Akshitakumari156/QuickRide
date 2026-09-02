import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginCaptain } from '../../api/authService';
import useFormState from '../../hooks/useFormState';
import { useToast } from '../../common/Toast/ToastContext';
import { FiMail, FiLock, FiNavigation, FiArrowLeft } from 'react-icons/fi';

const CaptainLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { formData, handleChange } = useFormState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await loginCaptain(formData.email, formData.password);

      if (data.token) {
        login(data.token, 'captain');
        toast.success('Redirecting to your dashboard.', 'Logged in successfully');
        navigate('/captain/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      console.error('Error in captain login:', error)
      toast.error(message, "Couldn't log you in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a12] text-white px-4 py-12 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-white/10 px-4 py-2 rounded-full transition-all cursor-pointer backdrop-blur-md"
      >
        <FiArrowLeft /> Back to Home
      </button>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/80 border border-white/15 p-8 md:p-10 flex flex-col gap-7 relative z-10 animate-[toast-in_0.3s_ease-out]">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-500/25 border border-white/20 mb-4">
            <FiNavigation className="text-xl" />
          </div>

          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full mb-2">
            Captain Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
            Driver Partner Sign In
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Access your active trips, dispatch map & daily earnings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Registered Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-sm">
                <FiMail />
              </div>
              <input
                type="email"
                name="email"
                placeholder="captain@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-sm">
                <FiLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Signing in..." : "Access Driver Console"}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-slate-400 font-medium border-t border-white/10 pt-5">
          New captain partner?{" "}
          <Link
            to="/captain/register"
            className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline ml-1 transition-colors"
          >
            Register to Drive
          </Link>
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Are you a rider?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
          >
            Rider Sign In →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin;
