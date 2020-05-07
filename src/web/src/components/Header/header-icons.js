import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function HeaderIcons () {
  const history = useHistory()
  
  const logout = () => {
    sessionStorage.removeItem("token")
    history.push('/')
  }
  return (
    <Row justify="center" align="middle" style={{ top: '8%' }}>
      <Col>
        {
          (sessionStorage.getItem("token")) ?
          <Link to={'/upload'}>
            <Button type="link">
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
          :
          <Link to={'/login'}>
            <Button type="link">
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
        }
      </Col>
      <Col>
        {
          (sessionStorage.getItem("token")) ?
          <div>
            <Link to={'/user'}>
              <Button type="link">
                <UserOutlined style={{ fontSize: '30px', color: '#949494' }}/>
              </Button>
            </Link>
            <Button type="link" onClick={logout}>
              Logout
            </Button>
          </div>
          :
          <Link to={'/login'}>
            <Button type="link">
              LogIn
            </Button>
          </Link>
        }
      </Col>
    </Row>
  )
}

export default HeaderIcons