import React, { Component } from 'react'
import { Button, Col } from 'antd'
import { Link } from 'react-router-dom'

export default class SearchBarSubmitButton extends Component {
  render() {
    return (
      <Col span={1} pull={7}>
        <Link to={this.props.url + this.props.title + "/" + this.props.location + "/" + this.props.dateFrom + "/" + this.props.dateTo}>
          <Button>
              Search
          </Button>
        </Link>
      </Col>
    )
  }
}