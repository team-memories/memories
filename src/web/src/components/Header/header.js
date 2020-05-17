import React from 'react'
import { Col, Layout, Row } from 'antd'
import HeaderLogo from './header-logo'
import SearchBar from '../SearchBar/search-bar'
import HeaderIcons from './header-icons'

function Header () {
  return (
    <Layout>
    {/*TODO(gee05053) 반응형 세분화하기*/}
      <Layout.Header style={{ backgroundColor: '#FFFFFF', boxShadow: '1px 1px 3px #B8B8B8' }}>
        <Row>
          <Col flex={1}>
            <HeaderLogo/>
          </Col>
          <Col flex={4}>
            <SearchBar/>
          </Col>
          <Col flex={1}>
            <HeaderIcons/>
          </Col>
        </Row>
      </Layout.Header>
    </Layout>
  )
}

export default Header