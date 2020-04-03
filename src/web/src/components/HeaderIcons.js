import React, { Component } from 'react'
import { Col, Button } from 'antd'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'

export default class HeaderIcons extends Component {
  render() {
    return (
      <Col span={2}>
        <Button type="link">
          <PlusCircleOutlined style={{fontSize : "25px"}}/>
        </Button>
        <Button type="link">
          <UserOutlined style={{fontSize : "25px"}}/>
        </Button>
      </Col>
    )
  }
}