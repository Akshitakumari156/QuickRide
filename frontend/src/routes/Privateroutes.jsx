import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Privateroutes = () => {
  const { isAuth, role } = useAuth()
  const location = useLocation()

  // Not logged in at all
  if (!isAuth) {
    return (
      <Navigate
        to={location.pathname.startsWith("/captain") ? "/captain/login" : "/login"}
        replace
      />
    )
  }

  // Captain trying to access user routes
  if (!location.pathname.startsWith("/captain") && role === "captain") {
    return <Navigate to="/captain/dashboard" replace />
  }

  // User trying to access captain routes
  if (location.pathname.startsWith("/captain") && role !== "captain") {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default Privateroutes
