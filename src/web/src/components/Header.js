import React, { Component } from 'react'
import { Layout, Row } from 'antd'
import HeaderLogo from './HeaderLogo'
import SearchBar from './SearchBar'
import HeaderIcons from './HeaderIcons'

export default class Header extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header style={{backgroundColor:'white', padding:0}}>
          <Row>
            <HeaderLogo />
            <SearchBar />
            <HeaderIcons />
          </Row>
        </Layout.Header>
      </Layout>
    )
  }
}