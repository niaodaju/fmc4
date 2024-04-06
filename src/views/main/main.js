import React, { useCallback } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Main() {
  const nav = useNavigate()
  const handleLogOut = useCallback(
    async () => {
      try {
        const res = await axios.post('logout',{},{
          headers: { 'authorization': "fm " + localStorage.getItem('fmtoken') },
        })
        console.log(res)
        localStorage.removeItem("fmtoken")
        nav('/login')
      } catch (err) {
        // console.log("error",err);
        message.error(`登出失败:${err.response.data}[${err.response.status}]`)
      }
    }, []
  )
  return (
    <div>
      <Button type="primary" onClick={handleLogOut} className="login-form-button">
        登出
      </Button>
      <p>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</p>
      Main
    </div>
  )
}
