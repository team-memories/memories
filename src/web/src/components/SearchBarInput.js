import React, { Component } from 'react'
import { Input, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default class SearchBarInput extends Component {
  render() {
    return (
      <Col span={9}>
        <Input
          placeholder="Search"
          onChange={this.props.onChangeTitle}
          prefix={<SearchOutlined/>}
          style={{width:'60.3%'}}
        />
      </Col>
    )
  }
}