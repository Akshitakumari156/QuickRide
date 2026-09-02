import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi"
import { useToast } from "./ToastContext"

const styles = {
  success: {
    icon: <FiCheckCircle />,
    ring: "border-emerald-500/30 shadow-emerald-500/10",
    iconWrap: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    bar: "bg-emerald-500",
  },
  error: {
    icon: <FiXCircle />,
    ring: "border-rose-500/30 shadow-rose-500/10",
    iconWrap: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    bar: "bg-rose-500",
  },
  warning: {
    icon: <FiAlertTriangle />,
    ring: "border-amber-500/30 shadow-amber-500/10",
    iconWrap: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    bar: "bg-amber-500",
  },
  info: {
    icon: <FiInfo />,
    ring: "border-blue-500/30 shadow-blue-500/10",
    iconWrap: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
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
            className={`relative overflow-hidden bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border ${s.ring} p-4 pl-4 flex items-start gap-3 animate-[toast-in_0.25s_ease-out]`}
          >
            <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg ${s.iconWrap}`}>
              {s.icon}
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              {t.title && <p className="text-sm font-bold text-white tracking-tight">{t.title}</p>}
              {t.message && (
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-medium">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
            <span className={`absolute bottom-0 left-0 h-0.5 ${s.bar} animate-[toast-shrink_4.5s_linear_forwards]`} />
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
