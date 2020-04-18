import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default class SearchBarSubmitButton extends Component {
  render () {
    return (
      <Link
        to={`/search?title=${this.props.title}&location=${this.props.location}&yearFrom=${this.props.yearFrom}&yearTo=${this.props.yearTo}`}>
        <Button>
          Search
        </Button>
      </Link>
    )
  }
}
