import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const url = '/search/'
export default class SearchBarSubmitButton extends Component {
  render() {
    return (
      <div>
        <Link to={url + this.props.title + "/" + this.props.location + "/" + this.props.dateFrom + "/" + this.props.dateTo}>
      //todo(gee05053) : slash대신 query parameter 사용
          <Button>
              Search
          </Button>
        </Link>
      </div>
    )
  }
}
