import React from 'react'

const Button = ({
    label="Button",
    bg="#2563EB",
    textColor="#FFFFFF",
    width="w-32",
    height="h-12",
    className="",
    rounded="xl",
    hoverbg,
    hovertextcolor,
    onClick,
    type="button",
    disabled=false,
    loading=false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${width} ${height} flex justify-center items-center gap-2 font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] ${(disabled || loading) ? "opacity-60 cursor-not-allowed shadow-none active:scale-100" : "cursor-pointer"} ${className}`}
      style={{backgroundColor: bg, color: textColor}}
      onMouseEnter={e => {
        if (hoverbg && !disabled && !loading) e.currentTarget.style.backgroundColor = hoverbg;
        if (hovertextcolor && !disabled && !loading) e.currentTarget.style.color = hovertextcolor;
      }}
      onMouseLeave={e => {
        if (bg) e.currentTarget.style.backgroundColor = bg;
        if (textColor) e.currentTarget.style.color = textColor;
      }}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      <span>{label}</span>
    </button>
  )
}

export default Button