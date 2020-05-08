import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row, message } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function HeaderIcons () {
  const history = useHistory()
  
  //logout 버튼을 누르면 sessionSotrage에 있는 token을 지우고 홈으로 이동
  const logout = () => {
    sessionStorage.removeItem("token")
    history.push('/')
  }

  return (
    <Row justify="center" align="middle" style={{ top: '8%' }}>
      <Col>
        {
          //sessionStorage에 token이 있으면 upload버튼을 눌렀을 때 업로드로, 아니면 login화면으로 이동
          (sessionStorage.getItem("token")) ?
          <Link to={'/upload'}>
            <Button type="link">
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
          :
          <Link to={'/login'}>
            <Button type="link" onClick={() => message.warning("로그인이 필요한 페이지입니다.")}>
              <UploadOutlined style={{ fontSize: '30px', color: '#949494' }}/>
            </Button>
          </Link>
        }
      </Col>
      <Col>
        {
          //sessionStorage에 token이 있으면 user버튼과 logout 버튼이 navbar에 있고, token이 없으면 login 버튼이있음
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