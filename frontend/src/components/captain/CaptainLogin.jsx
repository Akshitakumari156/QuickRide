import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CaptainLogin = () => {
  const {login}=useAuth();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:5000/api/captain/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login failed')
        return
      }

      console.log('Captain Login Response:', data)

      if (data.token) {
        login(data.token, 'captain');
        localStorage.setItem('captainToken', data.token);
        alert('Captain logged in successfully!');
        navigate('/captain/dashboard');
        
      }


    } catch (error) {
      console.error('Error in captain login:', error)
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
            className="w-full bg-black text-white py-3 rounded-2xl text-lg font-medium hover:bg-gray-800 transition"
          >
            Login as Captain
          </button>
        </form>
      </div>
    </div>
  )
}

export default CaptainLogin
