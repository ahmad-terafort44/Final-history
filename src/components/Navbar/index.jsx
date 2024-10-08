import React from 'react'
import style from "./Navbar.module.scss"
export default function index({setTab,tab}) {
  return (
    <div className={style.navBar}>
      <img src={require("../../assest/LOGO.png")} width={0} height={0} sizes='100%'/>
      <div className={style.navigation}>
        
      <button className={tab=="Dev"?style.activeTab:""}  onClick={()=>{setTab("Dev")}}>Development Server</button>
      <button className={tab=="Prod"?style.activeTab:""} onClick={()=>{setTab("Prod")}}>Production Sever</button>
      </div>
    </div>
  )
}
