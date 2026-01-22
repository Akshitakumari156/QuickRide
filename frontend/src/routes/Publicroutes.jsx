import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Publicroutes = () => {
  const { isAuth, role } = useAuth()

  if (isAuth && role === "user") {
    return <Navigate to="/dashboard" replace />
  }

  if (isAuth && role === "captain") {
    return <Navigate to="/captain/dashboard" replace />
  }

  return <Outlet />
}

export default Publicroutes
