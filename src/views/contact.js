import React from 'react'
import contact from "../resource/contact.png"
import "../css/common.css"
export default function Contact() {
  return (
    <div className="div_center">
      <h3 className='text_center'>请添加好友，获取登录权限</h3>
      <img src={contact} alt="微信二维码"></img> 
    </div>
  )
}
