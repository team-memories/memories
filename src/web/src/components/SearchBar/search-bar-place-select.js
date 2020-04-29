import React, { Component } from 'react'
import { Cascader } from 'antd'
import { LocationOptions } from '../constants'

export default class SearchBarPlaceSelect extends Component {
  render () {
    return (
      <div>
        <Cascader options={LocationOptions} placeholder="Place select" changeOnSelect
                  onChange={this.props.onChangeLocation}/>
      </div>
    )
  }
}