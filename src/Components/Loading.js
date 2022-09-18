import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
      color:'skyblue'
    }}
    spin
  />
);

const Loading = () => <Spin indicator={antIcon} />;

export default Loading;
