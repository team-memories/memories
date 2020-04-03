import React, { Component } from 'react'
import { Col, DatePicker } from 'antd'

export default class SearchBarYearSelect extends Component {
  render() {
    return (
      <Col span={2} pull={7}>
        <DatePicker.RangePicker
        picker="year"
        onChange={this.props.onChangeDate}
      />
      </Col>
    )
  }
}