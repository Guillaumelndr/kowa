import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = ({ page, style }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, ...style }} spin />;

  return (
    <div className={page ? 'full-page center' : ''}>
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Loader