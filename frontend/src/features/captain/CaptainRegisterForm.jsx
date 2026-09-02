import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerCaptain } from "../../api/authService";
import useFormState from "../../hooks/useFormState";
import { useToast } from "../../common/Toast/ToastContext";
import { FiNavigation, FiUser, FiTruck, FiArrowLeft, FiCheck } from "react-icons/fi";

const CaptainRegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { formData, handleChange } = useFormState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleColor: "",
    plateNumber: "",
    capacity: "",
    vehicleType: "car",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plateNumber: formData.plateNumber,
        capacity: Number(formData.capacity),
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const { data } = await registerCaptain(payload);

      if (data.token) {
        toast.success("Please log in to continue.", "Captain registered successfully");
        navigate("/captain/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      console.error("Error in captain registration:", error);
      toast.error(message, "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a12] text-white px-4 py-16 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-white/10 px-4 py-2 rounded-full transition-all cursor-pointer backdrop-blur-md"
      >
        <FiArrowLeft /> Back to Home
      </button>

      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/80 border border-white/15 p-8 md:p-12 flex flex-col gap-8 relative z-10 animate-[toast-in_0.3s_ease-out]">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-500/25 border border-white/20 mb-4">
            <FiNavigation className="text-xl" />
          </div>

          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full mb-2">
            Captain Onboarding
          </span>

          <h2 className="text-3xl font-black tracking-tight text-white font-display">
            Become a QuickRide Captain
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Join thousands of professional drivers earning on their own schedule
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <FiUser className="text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                1. Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="captain@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <FiTruck className="text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                2. Vehicle Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Vehicle Color
                </label>
                <input
                  type="text"
                  name="vehicleColor"
                  placeholder="e.g. Silver, White, Black"
                  required
                  value={formData.vehicleColor}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  License Plate Number
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  placeholder="e.g. DL 01 AB 1234"
                  required
                  value={formData.plateNumber}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Passenger Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="e.g. 4"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Vehicle Class
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-xl border border-white/10 bg-slate-950/80 text-white placeholder-slate-500 font-medium text-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="car" className="bg-slate-900 text-white">Car (Sedan/Hatchback/SUV)</option>
                  <option value="bike" className="bg-slate-900 text-white">Motorcycle / Bike</option>
                  <option value="auto" className="bg-slate-900 text-white">Auto Rickshaw</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Registering Partner..." : "Submit Captain Application"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 font-medium border-t border-white/10 pt-5">
          Already registered as a Captain?{" "}
          <Link
            to="/captain/login"
            className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline ml-1 transition-colors"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainRegisterForm;