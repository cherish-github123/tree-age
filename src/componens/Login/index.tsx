import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, message } from 'antd'
import './index.scss';
import { login } from '../../../api/login';
import * as _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../store/counterSlice';
import { setUserName } from '../../store/userSlice';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // 使用useNavigate钩子函数来获取导航对象
  const dispatch = useDispatch();  

  const [messageApi, contextHolder] = message.useMessage();
  
  const handleLogin = async () => {
    const param = { username, password, email};
    try {
      const res = await login(param); 
      if (_.get(res, 'status.code') === 200) {
        localStorage.setItem('token', _.get(res, 'data.token'));
        messageApi.success('登录成功');
        dispatch(setUserId(_.get(res, 'data.user_id')));
        dispatch(setUserName(username));
        navigate('/home', { replace: true });
      }else {
        messageApi.error(_.get(res,'status.message'));
      }
    }catch (error) {
      messageApi.error('登录失败');
    }
    // 假设登录成功后跳转到首页
  }

  const handleRegister = () => {
    console.log('注册用户名:', username)
    navigate('/register'); 
  }

  return (
    <div className="login-container">
      {contextHolder}
      <div className="login-form">
        <div className="login-title">
          <Typography.Title level={2}>登录</Typography.Title>
        </div>
        <Form layout="vertical" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="用户" style={{ marginBottom: 24 }}>
            <Input 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="密码" style={{ marginBottom: 24 }}>
            <Input.Password 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="邮箱" style={{ marginBottom: 24 }}>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="login-button" style={{ margin: '0 auto' }}>
            <Button type="primary" onClick={handleLogin}>
              登录
            </Button>
          </Form.Item>
        </Form>

        {/* 跳转到注册页面的链接 */}
        <div className="register-link">
            还没有账号？ 
            <span 
              onClick={handleRegister}
              style={{ color: 'blue' }}>
              注册
            </span>
        </div>
      </div>
    </div>
  )
}

export default Login;