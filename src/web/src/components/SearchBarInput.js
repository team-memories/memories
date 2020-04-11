import React, { Component } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default class SearchBarInput extends Component {
  constructor(props) {
    super(props)
    this.onPressEnter = this.onPressEnter.bind(this)
  }
  onPressEnter () {
    console.log("test")
  }
  render() {
    return (
      <div>
        <Input
          placeholder="Search"
          onChange={this.props.onChangeTitle}
          prefix={<SearchOutlined/>}
          onPressEnter={this.props.onPressEnter}
        />
      </div>
    )
  }
}