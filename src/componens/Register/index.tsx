/**
 * @description: 注册页面
 * @author: 2024-06-04 11:27:46
 */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, message } from 'antd';
import { regist, sendEmail } from '../../../api/register';
import _ from 'lodash';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [code, setCode] = useState(''); // 验证码


  const onFinish = async (values: any) => {
    console.log('values', values);
    if (values.password !== values.confirmPassword) {
      messageApi.error('两次输入的密码不一致');
      return;
    }
    try {
      const res = await regist(values);
      if (_.get(res, 'status.code') === 200) {
        messageApi.success('注册成功');
        navigate('/');
      } else {
        messageApi.error(_.get(res, 'status.message'));
      }
    } catch (error) {
      messageApi.error('注册失败');
    }
  };

  const handleSendEmailCode = async () => {
    const email = form.getFieldValue('email');
    console.log('email', email);
    if (!email) {
      messageApi.error('请先输入邮箱');
      return;
    }

    // 验证验证码
    try {
      const res = await sendEmail({ email });
      if (_.get(res, 'status.code') === 200) {
        messageApi.success(_.get(res, 'status.message'));
        setEmailCodeSent(true);
        return;
      }
    } catch (error) {
      messageApi.error('验证码发送失败');
      return;
    }
  };

  return (
    <div className="login-container">
       {contextHolder}
      <div className="login-form">
        <div className="login-title">
          <Typography.Title level={2}>注册</Typography.Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码'}]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="邮箱" name="email" rules={[{ type: 'email' }, { required: true, message: '请输入邮箱'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
            ]}
          >
            <Input
              style={{ width: '70%' }}
              type='number'
              placeholder="请输入验证码"
            />
           
          </Form.Item>
          <Button
              type="link"
              onClick={handleSendEmailCode}
              disabled={emailCodeSent}
              style={{
                position: 'relative',
                left: '300px',
                bottom: '58px' }}
            >
              发送验证码
            </Button>

          <Form.Item className="login-button">
            <Button type="primary" htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;