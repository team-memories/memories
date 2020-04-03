import React, { Component } from 'react'
import { Col, Select } from 'antd'

export default class SearchBarYearSelect extends Component {
  render() {
    const { Option } = Select
    return (
      <Col span={2} pull={7}>
        <Select defaultValue={this.props.text} onChange={this.props.onChangeDate}>
          <Option value="1940">1940</Option>
          <Option value="1950">1950</Option>
          <Option value="1960">1960</Option>
          <Option value="1970">1970</Option>
          <Option value="1980">1980</Option>
          <Option value="1990">1990</Option>
        </Select>
      </Col>
    )
  }
}