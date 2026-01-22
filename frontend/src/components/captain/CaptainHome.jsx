import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const CaptainHome = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
const [isOnline, setIsOnline] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem("captainToken")
    navigate("/captain/login")
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Captain Panel</h2>

        <nav className="flex flex-col gap-4">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "history", label: "Ride History" },
            { id: "reviews", label: "Reviews" },
            { id: "profile", label: "Profile Settings" },
            { id: "availability", label: "Availability" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-blue-600"
                  : "hover:bg-[#1E293B]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
  <>
    <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

    {/* TOP STATS */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {[
        { label: "Total Earnings", value: "₹12,450" },
        { label: "Rides Accepted", value: "128" },
        { label: "Rides Rejected", value: "12" },
        { label: "Online Hours", value: "74h" },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <p className="text-gray-500">{item.label}</p>
          <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
        </div>
      ))}

      {/* ✅ AVAILABILITY CARD */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-2">Availability</p>

        <span
          className={`mb-4 px-4 py-1 rounded-full text-sm font-semibold ${
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isOnline ? "ONLINE" : "OFFLINE"}
        </span>

        <button
          onClick={() => setIsOnline((prev) => !prev)}
          className={`px-6 py-2 rounded-xl font-medium transition ${
            isOnline
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Go {isOnline ? "Offline" : "Online"}
        </button>
      </div>
    </div>

    {/* PERFORMANCE */}
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-2">Performance</h3>
      <p className="text-gray-500">
        You are performing better than 82% of captains in your city.
      </p>
    </div>
  </>
)}


        {/* RIDE HISTORY */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ride History</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Fare</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">20 Jan</td>
                  <td>MG Road</td>
                  <td>Airport</td>
                  <td>₹420</td>
                  <td className="text-green-600">Completed</td>
                </tr>
                <tr>
                  <td className="py-2">18 Jan</td>
                  <td>City Mall</td>
                  <td>Station</td>
                  <td>₹180</td>
                  <td className="text-red-500">Cancelled</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Passenger Reviews</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                ⭐⭐⭐⭐⭐ – “Very polite and smooth ride.”
              </div>
              <div className="border p-4 rounded-lg">
                ⭐⭐⭐⭐ – “Good driving but arrived late.”
              </div>
            </div>
          </div>
        )}

        {/* PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <input
              placeholder="Full Name"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <input
              placeholder="Vehicle Number"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Save Changes
            </button>
          </div>
        )}

        {/* AVAILABILITY */}
        {activeTab === "availability" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl">
              Go Online
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default CaptainHome
