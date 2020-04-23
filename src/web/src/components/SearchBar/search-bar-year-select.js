import React, { Component } from 'react'
import { DatePicker } from 'antd'

export default class SearchBarYearSelect extends Component {
  render () {
    return (
      <div>
        <DatePicker.RangePicker
          picker="year"
          onChange={this.props.onChangeYear}
        />
      </div>
    )
  }
}