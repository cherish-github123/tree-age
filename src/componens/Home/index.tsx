import React, { useEffect } from 'react';
import { Layout, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileFilled, FolderAddFilled } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const { Header, Content } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const userName = useSelector((state:any) => state.userName.value )
  const token = localStorage.getItem('token');

  useEffect(()=> {
    console.log('token', token)
    if (!token) {
      navigate('/login');
    }else {
      navigate('/home');
    }
  }, [] )
 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2d5f4d', color: 'white', borderBottom: '1px solid #1a4030' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/home')}>年轮识别系统</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button icon={<FolderAddFilled />} onClick={() => navigate('/home')}>首页</Button>
          <Button icon={<ProfileFilled />} onClick={() => navigate('/history')}>历史记录</Button>
          <Button icon={<UserOutlined />} onClick={() => navigate('/mine')} style={{ cursor: 'pointer' }}>{userName}</Button>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>退出</Button>
        </div>
      </Header>
      
      <Content style={{ padding: '0 20%', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default Home;