import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainRegisterForm = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    vehicleColor: '',
    plateNumber: '',
    capacity: '',
    vehicleType: 'car'
  })
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}
  const handleSubmit= async (e) => {
    e.preventDefault();
     const payload = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
    vehicle: {
      color: formData.vehicleColor,
      plateNumber: formData.plateNumber,
      capacity: Number(formData.capacity),
      vehicleType: formData.vehicleType
    }
  }
    try {
        const response=await fetch('http://localhost:5000/api/captain/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        })
        const data=await response.json();
        console.log("Captain Registration Response:",data);
        if(data.token){
            alert("Captain registered successfully!");
            navigate('/captain/login');
            
        }
        
    } catch (error) {
        console.error("Error in captain registration:", error);
    }
  }

  

  return (
    <div className="min-h-screen flex items-center mt-4 justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black h-24 text-center text-white p-4 ">
          <h2 className="text-3xl font-semibold">Become a Captain</h2>
          <p className="text-gray-300 mt-2">Drive, earn, and grow on your own schedule</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                required
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-4 space-y-4">
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
                placeholder="Create Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>

            <div className="space-y-4">
              <input
                type="text"
                name="vehicleColor"
                placeholder="Vehicle Color"
                required
                value={formData.vehicleColor}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="text"
                name="plateNumber"
                placeholder="Plate Number"
                required
                value={formData.plateNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="capacity"
                  placeholder="Passenger Capacity"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl text-lg font-medium hover:bg-gray-800 transition"
          >
            Register as Captain
          </button>
        </form>
      </div>
    </div>
  )
}

export default CaptainRegisterForm