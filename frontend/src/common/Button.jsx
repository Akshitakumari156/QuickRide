import React from 'react'

const Button = ({
    label="Button",
    bg="#2ECC71",
    textColor="#0F2C46",
    width="w-32",
    height="h-12",
    className="",
    rounded="lg",
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
     className={`${width} ${height} flex justify-center items-center gap-2 rounded-${rounded} ${(disabled || loading) ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
    style={{backgroundColor: bg, color: textColor}}
    onMouseEnter={e=>{
        if(hoverbg && !disabled && !loading)e.target.style.backgroundColor=hoverbg;
        if(hovertextcolor && !disabled && !loading)e.target.style.color=hovertextcolor;
    }}
    onMouseLeave={e=>{
      if(bg)e.target.style.backgroundColor=bg;
        if(textColor)e.target.style.color=textColor;
    }}
    >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {label}
    </button>
  )
}

export default Button