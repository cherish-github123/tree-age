import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { updateUserInfo, getUserInfo } from '../../../api/mine';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../../store/userSlice';


const Mine: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // 用户名
  const [email, setEmail] = useState<string>(''); // 邮箱
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const userId = useSelector((state: any) => {
    console.log('state', state);

    return state.userId.value;
  });

  const getUser = async (params: { userId: string }) => {
    try {
      const res = await getUserInfo();
      // console.log('res', (_.get(res, 'data.username')));
      if (_.get(res, 'status.code') === 200) {
        console.log('res', (_.get(res, 'data.username')));
        setUsername(_.get(res, 'data.username') || '');
        setEmail(_.get(res, 'data.email') || '');
        dispatch(setUserName(_.get(res, 'data.username')));
        form.setFieldsValue({
          username: _.get(res, 'data.username'),
          email: _.get(res, 'data.email'),
          password: ''
        })
      }
    }catch (error) {
      messageApi.error('获取用户信息失败');
    } 
  
  } 
  // 获取用户信息
  useEffect(() => {
    try {
      getUser({ userId });
    }catch (error) {
      messageApi.error('获取用户信息失败');
    }
  }, [username, email, userId]);

  const onFinish = async (values: { username?: string; email?: string; password?: string }) => {
    try {
      const res = await updateUserInfo(values);
      if (_.get(res, 'status.code') === 200) {
        messageApi.success('修改成功');
        setUsername(values.username || ''); // 更新用户名
        setEmail(values.email || ''); // 更新邮箱
        form.resetFields([
          {
            username: values.username,
            email: values.email
          }
        ]
        )
      }else{
        messageApi.error(_.get(res,'status.message'));
      }
    } catch (error) {
      messageApi.error('修改失败');
    }
  };
  console.log('userId', username);
  return (
    <Card
      style={{
        width: '50vw',
        margin: '24px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: 8
      }}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="修改密码"
          name="password"
          rules={[
            { message: '请输入新密码' },
            { min: 8, message: '密码至少8位' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: '需包含大小写字母和数字'
            }
          ]}
        >
          <Input.Password placeholder="输入新密码" />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
          >
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Mine;