import React from 'react'
import ReactDom from "react-dom"
import style from "./FullScreenImage.module.scss"
export default function index({image,setOpenModel}) {
  return ReactDom.createPortal(
    <section className={style.container} onClick={(event)=>{setOpenModel(false)}}>
      <div className={style.box}>
        <img src={image} width={0} height={0} sizes='100%'/>
      </div>
    </section>
  ,document.querySelector(".modelContainer"))
}
