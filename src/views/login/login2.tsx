import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from '../../redux/store'
import axios from 'axios'
import './login.css';

export default function Login2() {
    const nav = useNavigate()
    const onFinish = async (values:any) => {
      try {
        store.dispatch({
          type:'fadfadf'
        })
        const res = await axios.post(`login`, values);
        console.log(res)
        // setUser(res.data);
         localStorage.setItem("fmtoken",res.data.accessToken)
        nav('/main')
      } catch (err:any) {
        // console.log("error",err);
        message.error(`登录失败:${err.response.data}[${err.response.status}]`)
      }
  
    };
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
      <Link to="/exercise">练习</Link><br></br>
      <Link to="/tmain">老师主页</Link><br></br>
      <Link to="/upload">上传</Link><br></br>
      <Link to="/drag">拖放</Link>

    </Form>
  )
}
