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

}) => {
  return (
    <button
    onClick={onClick}
     className={`${width} ${height} flex justify-center items-center rounded-${rounded}  ${className}`}
    style={{backgroundColor: bg, color: textColor}}
    onMouseEnter={e=>{
        if(hoverbg)e.target.style.backgroundColor=hoverbg;
        if(hovertextcolor)e.target.style.color=hovertextcolor;
    }}
    onMouseLeave={e=>{
      if(bg)e.target.style.backgroundColor=bg;
        if(textColor)e.target.style.color=textColor;
    }}
    >
        {label}
    </button>
  )
}

export default Button
