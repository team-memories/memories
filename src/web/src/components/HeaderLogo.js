import React, { Component } from 'react'
import logo from '../Image/memories_logo.jpg'
import { Col } from 'antd'
import { Link } from 'react-router-dom'

export default class HeaderLogo extends Component {
  render() {
    return (
      <Col span={1}>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{width: '63px'}}
          />
        </Link>
      </Col>
    )
  }
}