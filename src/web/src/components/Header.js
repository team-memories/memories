import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderLogo from './HeaderLogo'
import SearchBar from './SearchBar'
import HeaderIcons from './HeaderIcons'

export default class Header extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header style={{backgroundColor:'white', padding:0}}>
          <Row>
            <Col span={1}>
              <HeaderLogo />
            </Col>
            <Col span={21} push={2}>
              <SearchBar />
            </Col>
            <Col span={2}>
              <HeaderIcons />
            </Col>
          </Row>
        </Layout.Header>
      </Layout>
    )
  }
}