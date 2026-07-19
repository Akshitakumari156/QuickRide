import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginCaptain } from '../../api/authService';
import useFormState from '../../hooks/useFormState';

const CaptainLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
        alert('Captain logged in successfully!');
        navigate('/captain/dashboard');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      console.error('Error in captain login:', error)
      alert(message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black text-white   p-4 text-center">
          <h2 className="text-2xl font-semibold">Captain Login</h2>
          <p className="text-gray-300 mt-1">Welcome back, Captain</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-2xl text-lg font-medium hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Logging in..." : "Login as Captain"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CaptainLogin;