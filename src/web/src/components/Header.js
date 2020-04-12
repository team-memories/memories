import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderLogo from './HeaderLogo'
import SearchBar from './SearchBar'
import HeaderIcons from './HeaderIcons'

export default class Header extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header style={{backgroundColor:'#F8F8F8', paddingInlineStart:"1.5%", minWidth: 1300, overflowX: 'auto', boxShadow: "5px 1px 7px #B8B8B8"}}>
          <Row align="middle" justify="center">
            <Col flex={1}>
              <HeaderLogo />
            </Col>
            <Col flex={3}>
              <SearchBar />
            </Col>
            <Col flex={1} style={{paddingInlineStart:"10%"}}>
              <HeaderIcons />
            </Col>
          </Row>
        </Layout.Header>
      </Layout>
    )
  }
}