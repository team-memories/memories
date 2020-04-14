import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderLogo from './HeaderLogo'
import SearchBar from './SearchBar'
import HeaderIcons from './HeaderIcons'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width : window.outerWidth
    }
  }
  render() {
    return (
      <Layout>
        <Layout.Header style={{backgroundColor:'#F8F8F8', boxShadow: "5px 1px 7px #B8B8B8", overflowX:"hidden"}}>
          <Row>
            <Col flex={1}>
              <HeaderLogo />
            </Col>
            <Col flex={4}>
              <SearchBar />
            </Col>
            <Col flex={1} style={{marginTop: "7px"}}>
              <HeaderIcons />
            </Col>
          </Row>
        </Layout.Header>
      </Layout>
    )
  }
}