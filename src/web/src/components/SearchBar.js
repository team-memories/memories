import React, { Component } from 'react'
import { Row, Col } from 'antd'
import SearchBarInput from './SearchBarInput'
import SearchBarPlaceSelect from './SearchBarPlaceSelect'
import SearchBarSubmitButton from './SearchBarSubmitButton'
import SearchBarYearSelect from './SearchBarYearSelect'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      dateFrom : '',
      dateTo : '',
      location : ''
    }
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
  }
  onChangeTitle = (e) => {
    this.setState({
      title : e.target.value
    })
  }
  onChangeLocation (value) {
    this.setState({
      location : value[0] + " "  + value[1] + " " + value[2]
    })
  }
  onChangeDate (value) {
    this.setState({
      dateFrom : value[0]._d.getFullYear(),
      dateTo : value[1]._d.getFullYear()
    })
  }
  render() {
    return (
      <Row>
        <Col span={10}>
          <SearchBarInput onChangeTitle={this.onChangeTitle}/>
        </Col>
        <Col span={3}>
        < SearchBarPlaceSelect onChangeLocation={this.onChangeLocation}/>
        </Col>
        <Col span={4}>
          <SearchBarYearSelect onChangeDate={this.onChangeDate}/>
        </Col>
        <Col span={1}>
          <SearchBarSubmitButton title={this.state.title} location={this.state.location} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo}/>
        </Col>
      </Row>
    )
  }
}