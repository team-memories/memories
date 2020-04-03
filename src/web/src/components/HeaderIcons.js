import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'

export default class HeaderIcons extends Component {
  render() {
    return (
      <Row>
        <Col span={10}>
          <Button type="link">
            <PlusCircleOutlined style={{fontSize : "25px"}}/>
          </Button>
        </Col>
        <Col span={2}>
          <Button type="link">
            <UserOutlined style={{fontSize : "25px"}}/>
          </Button>
        </Col>
      </Row>
    )
  }
}