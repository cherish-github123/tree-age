/**
 * @description: 上传历史记录
 * @author: 2024-06-04 11:27:46
 */

import React, { useState, useEffect } from 'react'
import { List, Row, Col, Image, Typography, message } from 'antd';
import { getUploadHistory } from '../../../api/upLoad';
import _ from 'lodash';


const HistoryRecord: React.FC = () => {
  const [resultData, setResultData] = useState([]);
  const [ messageApi, contextHolder ] = message.useMessage();


  const getHistoryData = async () => {
    try {
      const res = await getUploadHistory();
      if (_.get(res,'status.code') === 200) {
        setResultData(_.get(res,'data')); 
      }else {
        messageApi.error(_.get(res,'status.message'));
      }
    }catch(error){
      console.log('error', error);
      messageApi.error('获取历史记录失败');
    }
   
  }
  useEffect(() => {
      getHistoryData();
    }, []);

 

  return (
    <div className='history-record' style={{ padding: 24, height: '100vh' }}>
      {contextHolder}
      <h1 style={{ marginBottom: 24 }}>历史记录</h1>
      <List
        itemLayout="vertical"
        dataSource={resultData as any[]}
        style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
        renderItem={(item) => (
          <List.Item
            style={{ 
              border: '1px dashed #d9d9d9',
              borderRadius: 4,
              marginBottom: 16,
              padding: 16
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Image
                  src={item.image_path}
                  alt="历史图片"
                  style={{ maxHeight: 200, objectFit: 'contain' }}
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                  上传时间：{item.created_at}
                </div>
              </Col>
              <Col span={12}>
                <Typography.Title level={5} style={{ marginTop: 0 }}>
                  识别结果
                </Typography.Title>
                <Typography.Text>
                  年轮数（树龄）: {item.ring_count}
                </Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default HistoryRecord;