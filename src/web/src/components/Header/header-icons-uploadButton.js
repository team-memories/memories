import React from 'react'
import { Link } from 'react-router-dom'
import { Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

function UploadButton () {
  if (sessionStorage.getItem("token")) {
    return (
      <Link to={'/upload'}>
        <Button type="link">
          <UploadOutlined style={{ fontSize: '30px', color: '#72A4DD' }}/>
        </Button>
      </Link>
    )
  }
  else {
    return (
      <Link to={'/login'}>
        <Button type="link" onClick={() => message.warning("로그인이 필요한 페이지입니다.")}>
          <UploadOutlined style={{ fontSize: '30px', color: '#72A4DD' }}/>
        </Button>
      </Link>
    )
  }
}

export default UploadButton