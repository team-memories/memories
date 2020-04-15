import React, { Component } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default class SearchBarInput extends Component {
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