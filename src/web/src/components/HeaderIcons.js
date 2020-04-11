import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default class HeaderIcons extends Component {
  render() {
    return (
      <Row>
        <Col span={10}>
          <Link to={'/upload'}>
            <Button type="link">
              <UploadOutlined style={{fontSize : "30px"}}/>
            </Button>
          </Link>
        </Col>
        <Col span={2}>
          <Button type="link">
            <UserOutlined style={{fontSize : "30px"}}/>
          </Button>
        </Col>
      </Row>
    )
  }
}