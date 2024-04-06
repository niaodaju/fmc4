import React from 'react'
import Redirect from './Redirect'

// import Redirect
//登录验证
export default function  AuthLogin({children}) {
  const isLogin= localStorage.getItem("fmtoken")
  console.log(isLogin)
  
  return  isLogin?children:<Redirect to="/login"></Redirect>
}
