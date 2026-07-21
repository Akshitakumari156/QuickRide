import { createContext, useCallback, useContext, useRef, useState } from "react"

const ToastContext = createContext(null)

let idCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const showToast = useCallback(
    ({ type = "info", title, message, duration = 4500 }) => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, type, title, message }])
      timers.current[id] = setTimeout(() => removeToast(id), duration)
      return id
    },
    [removeToast]
  )

  const toast = {
    success: (message, title = "Success") => showToast({ type: "success", title, message }),
    error: (message, title = "Something went wrong") => showToast({ type: "error", title, message }),
    info: (message, title = "Heads up") => showToast({ type: "info", title, message }),
    warning: (message, title = "Warning") => showToast({ type: "warning", title, message }),
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
}
