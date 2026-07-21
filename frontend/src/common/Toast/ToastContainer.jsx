import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi"
import { useToast } from "./ToastContext"

const styles = {
  success: {
    icon: <FiCheckCircle />,
    ring: "border-emerald-200",
    iconWrap: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
  },
  error: {
    icon: <FiXCircle />,
    ring: "border-red-200",
    iconWrap: "bg-red-50 text-red-600",
    bar: "bg-red-500",
  },
  warning: {
    icon: <FiAlertTriangle />,
    ring: "border-amber-200",
    iconWrap: "bg-amber-50 text-amber-600",
    bar: "bg-amber-500",
  },
  info: {
    icon: <FiInfo />,
    ring: "border-blue-200",
    iconWrap: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
  },
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 w-[calc(100%-2.5rem)] max-w-sm">
      {toasts.map((t) => {
        const s = styles[t.type] || styles.info
        return (
          <div
            key={t.id}
            role="alert"
            className={`relative overflow-hidden bg-white rounded-2xl shadow-2xl shadow-black/10 border ${s.ring} p-4 pl-4 flex items-start gap-3 animate-[toast-in_0.25s_ease-out]`}
          >
            <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg ${s.iconWrap}`}>
              {s.icon}
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              {t.title && <p className="text-sm font-bold text-slate-900">{t.title}</p>}
              {t.message && (
                <p className="text-sm text-slate-500 mt-0.5 leading-snug">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 -mt-1"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
            <span className={`absolute bottom-0 left-0 h-1 ${s.bar} animate-[toast-shrink_4.5s_linear_forwards]`} />
          </div>
        )
      })}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toast-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export default ToastContainer
