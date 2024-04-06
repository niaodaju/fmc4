import React, { useCallback, useState } from 'react'
import 'antd/dist/reset.css';
import './login.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
// import fm from '..//..//constants/common';
// import jwt_decode from "jwt-decode";
// import initAxios from '../../utils/fmAxios';
import store from '../../redux/store'

export default function Login() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const nav = useNavigate()
  const onFinish = async (values) => {
    try {
      store.dispatch({
        type:'fadfadf'
      })
      const res = await axios.post(`login`, values);
      setUser(res.data);
       localStorage.setItem("fmtoken",res.data.accessToken)
      nav('/main')
    } catch (err) {
      // console.log("error",err);
      message.error(`登录失败:${err.response.data}[${err.response.status}]`)
    }

  };


  const [loginData, setLoginData] = useState({})

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/contact">忘记密码</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        <Link to="/contact">联系注册新用户</Link>
      </Form.Item>
      <Link to="/exercise">练习</Link>
    </Form>

  )
}
