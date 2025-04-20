/**
 * @description: 图片上传页面（主页面）
 * @author: 2024-06-04 11:27:46
 */
import React, { useState, useEffect } from'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Image, Row, Col, Typography, message } from 'antd';
import { upLoad } from '../../../api/upLoad';
import _ from 'lodash';


const Uploader: React.FC = () => {
  const [file, setFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const navigate = useNavigate();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
      const isLogin = localStorage.getItem('isLogin');
      return () => {
        console.log('组件卸载');
      }; 
  }, []);


  const handleUpload = async ({ file }: any) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await upLoad(formData);
      setImageUrl(_.get(res, 'data.image_path', ''));
      setResultData({
        ring_count: _.get(res, 'data.ring_count'),
      });
    } catch (error) {
      messageApi.error('上传失败');
    } 
  }
    
  return (
    <div className="uploader">
      {contextHolder}
      <Upload.Dragger
        customRequest={handleUpload}
        accept="image/*"
        multiple={false}
        maxCount={1}
        style={{ height: '33.33vh', margin: '20px 0' }}
      >
      <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
      <p className="ant-upload-hint">仅支持单个文件上传</p>
    </Upload.Dragger>
    <div style={{ 
      flex: 1, 
      border: '1px dashed #d9d9d9',
      borderRadius: 4,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      <Row gutter={16}>
        <Col span={12}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="处理结果预览"
              style={{ maxHeight: 300, objectFit: 'contain' }}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#999' }}>等待上传图片</div>
          )}
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>识别结果</Typography.Title>
          {resultData ? (
            <div>
              <Typography.Text>年轮数（树龄）: {resultData.ring_count}</Typography.Text>
            </div>
          ) : (
            <Typography.Text type="secondary">暂无识别数据</Typography.Text>
          )}
        </Col>
      </Row>
    </div>
  </div>
  )
}

export default Uploader;